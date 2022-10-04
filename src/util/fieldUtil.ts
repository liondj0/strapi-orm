import {Component} from "../objects/component";
import {RawEntityRelation} from "../types/raw-entity-relation";
import {Entity} from "../objects/entity";
import {StrapiObject} from "../objects/strapi-object";
import {objectUtil} from "./objectUtil";
import {FieldType} from "../enums/field-type";
import {Field} from "../fields/field";
import {CONSTANTS} from "./constants";


export const getFields = <T extends StrapiObject>(target: any): Field<T>[] => {
    return Reflect.getMetadata(CONSTANTS.FIELDS_KEY, target);
}

const parseComponentCallback = <T extends Component>(builder: () => T, data: Partial<T>, mapper?: (data: T) => any) => {
    const object = builder();
    const callback = object.parseComponentFromRawData.bind(object);
    return mapper ? mapper(callback(data) as T) : callback(data);
}

const parseComponentFieldFromRawData = <T extends Component>(field: Field<T>, data: any | any[]) => {
    const callback = (data: T) => parseComponentCallback(field.options!.builder!, data, field.options?.mapper);
    if(Array.isArray(data)) return data.map(callback) as T[];
    return callback(data);
}

const parseEntityCallback = <T extends Entity>(builder: () => T, data: Partial<T>) => {
    const object = builder();
    return object.parseEntity.bind(object)(data);
}

const parseRelationFieldFromRawData = <T extends Entity>(field: Field<T>, relation: RawEntityRelation<any>) => {
    const data = relation.data;
    const arrayCallback = (data: any) => parseEntityCallback(field.options!.builder!, {id: data.id, ...data.attributes});
    const mappedCallback = (callback: (data: any) => any) => field.options?.mapper ? field.options.mapper(callback(data)) : callback(data);
    if(Array.isArray(data)) return data.map(i => mappedCallback(arrayCallback)) as Entity[];
    return mappedCallback(() => parseEntityCallback(field.options!.builder!, data.attributes));
}

export const parseFieldsFromRawData = <T extends StrapiObject>(target: T, data: Partial<T>): T | T[] => {
    const targetClone = objectUtil.deepClone(target) as T;
    const fields = getFields(target.getInstance());
    fields.forEach(field => {
        // TODO: Consider implementing typechecking here
        // @ts-ignore
        if(field.type === FieldType.COMPONENT) targetClone[field.key] = parseComponentFieldFromRawData(field, data[field.key]);
        // @ts-ignore
        else if(field.type === FieldType.RELATION) targetClone[field.key] = parseRelationFieldFromRawData(field, data[field.key]);
        else targetClone[field.key] = data[field.key] as any;
    });
    return targetClone
}
