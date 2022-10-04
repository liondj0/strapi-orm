import "reflect-metadata";
import {FieldType} from "../enums/field-type";
import {CONSTANTS} from "../util/constants";

export type FieldOptions<T> = {
    builder?: () => T,
    mapper?: (data: T) => any;
}
export type Field<T> = {key: keyof T, type: FieldType, options?: FieldOptions<T>};
export const field = <T extends Object>(type = FieldType.STRING, options?: FieldOptions<T>) => {
    return (target: any, propertyKey: string): void => {
        if([FieldType.COMPONENT, FieldType.RELATION].includes(type) && !options?.builder) {
            console.log(`Builder not provided for field: ${String(propertyKey)} on target: ${JSON.stringify({target}, null, 3)}`);
            throw new Error(`Builder not provided`);
        }
        const fields: Field<T>[] = Reflect.getMetadata(CONSTANTS.FIELDS_KEY, target.constructor) ?? [];
        fields.push({key: propertyKey as keyof T, type, options});
        Reflect.defineMetadata(CONSTANTS.FIELDS_KEY, fields, target.constructor);
    };
}



