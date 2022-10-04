import {StrapiObject} from "../objects/strapi-object";
import {FieldType} from "../enums/field-type";
import {Field} from "../fields/field";
import {CONSTANTS} from "./constants";

type Relation = {field: Field<any>, relations: Relation[]};
const getRelations = <T extends StrapiObject>(target: any): Relation[] => {
    const objectFields: Relation[] =  Reflect.getMetadata(CONSTANTS.FIELDS_KEY, target).filter((field: Field<T>) => [FieldType.RELATION, FieldType.COMPONENT].includes(field.type)).map((field: Field<T>) => ({field, relations: []}));
    objectFields.forEach(relation => relation.relations.push(...getRelations((relation.field.options!.builder!)().getInstance())))
    return objectFields;
}

const flattenRelations = (relations: Relation[], prefix?: string): string[] => {
    const flatRelations: string[] = []
    relations.map(r => flatRelations.push(...[r.field.key as string, ...(r.relations ? flattenRelations(r.relations, r.field.key as string) : [])]));
    return prefix ? flatRelations.map(r => `${prefix}.${r}`) : flatRelations;
}

export const getFlatRelationsForObject = (target: any): string[] => {
    return flattenRelations(getRelations(target));
}
