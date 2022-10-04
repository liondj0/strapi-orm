import {Component} from "../objects/component";
import {RawEntityRelation} from "../types/raw-entity-relation";
import {Entity} from "../objects/entity";
import {StrapiObject} from "../objects/strapi-object";
import {objectUtil} from "./objectUtil";
import {FieldType} from "../enums/field-type";
import {Field} from "../fields/field";
import {CONSTANTS} from "./constants";
import {Meta} from "../../__tests__/mocs/entities/components/meta";
import {Home} from "../../__tests__/mocs/entities/home";


export const getFields = <T extends StrapiObject>(target: any): Field<T>[] => {
    return Reflect.getMetadata(CONSTANTS.FIELDS_KEY, target);
}

const parseComponentCallback = <T extends Component>(builder: () => T, data: Partial<T>) => {
    const object = builder();
    return object.parseComponentFromRawData.bind(object)(data);
}

const parseComponentFieldFromRawData = <T extends Component>(field: Field<T>, data: any | any[]): Component | Component[] => {
    if(Array.isArray(data)) return data.map(data => parseComponentCallback(field.options!.builder!, data)) as T[];
    return parseComponentCallback(field.options!.builder!, data);
}

const parseEntityCallback = <T extends Entity>(builder: () => T, data: Partial<T>) => {
    const object = builder();
    return object.parseEntity.bind(object)(data);
}

const parseRelationFieldFromRawData = <T extends Entity>(field: Field<T>, relation: RawEntityRelation<any>): Entity | Entity[] => {
    const data = relation.data;
    if(Array.isArray(data)) return data.map(i => parseEntityCallback(field.options!.builder!, {id: i.id, ...i.attributes})) as Entity[];
    return parseEntityCallback(field.options!.builder!, data.attributes);
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
