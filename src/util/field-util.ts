import { RawEntityRelation } from "../types/raw-entity-relation";
import { StrapiObject } from "../objects/strapi-object";
import { objectUtil } from "./object-util";
import { FieldType } from "../enums/field-type";
import { Field } from "../fields/field";
import { CONSTANTS } from "./constants";

export const getFields = <T extends StrapiObject>(target: any): Field<T>[] => {
    return Reflect.getMetadata(CONSTANTS.FIELDS_KEY, target);
};

const mapRelationDataToStrapiObject = <T extends StrapiObject>(data: RawEntityRelation<T>) => {
    if (Array.isArray(data.data)) return data.data.map(d => ({ id: d.id, ...d.attributes }));
    return data.data.attributes;
};

const parseCallback = <T extends StrapiObject>(builder: () => T, data: Partial<T>, mapper?: (data: T) => any) => {
    const object = builder();
    const callback = object.parseData.bind(object);
    return mapper ? mapper(callback(data) as T) : callback(data);
};

const parseRelationData = <T extends StrapiObject>(field: Field<T>, data: Partial<T> | Partial<T>[]) => {
    const callback = (data: any) => parseCallback(field.options!.builder!, data, field.options?.mapper);
    if (Array.isArray(data)) return data.map(callback);
    return callback(data);
};

export const parseFieldsFromRawData = <T extends StrapiObject>(target: T, data: Partial<T>): T | T[] => {
    const targetClone = objectUtil.deepClone(target) as T;
    const fields = getFields(target.getInstance());
    fields.forEach(field => {
        // TODO: Consider implementing typechecking here
        if (field.type === FieldType.COMPONENT) targetClone[field.key] = parseRelationData(field, data[field.key]! as any);
        else if (field.type === FieldType.RELATION) targetClone[field.key] = parseRelationData(field, mapRelationDataToStrapiObject(data[field.key]! as any));
        else targetClone[field.key] = data[field.key] as any;
    });
    return targetClone;
};
