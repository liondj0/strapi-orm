import "reflect-metadata";
import { FieldType } from "../enums/field-type";
import { CONSTANTS } from "../util/constants";

export type FieldOptions<T> = {
    builder?: () => T;
    mapper?: (data: T) => any;
    nullable?: boolean;
};
export type Field<T> = { key: keyof T; type: FieldType; options?: FieldOptions<T> };

export type TypeOrOptions<T> = FieldType | FieldOptions<T>;

export function field<T>(typeOrOptions?: FieldType, options?: FieldOptions<T>): (target: any, propertyKey: string) => void;
export function field<T>(typeOrOptions?: TypeOrOptions<T>, options?: FieldOptions<T>): (target: any, propertyKey: string) => void {
    const type = typeof typeOrOptions === "string" ? (typeOrOptions as FieldType) : FieldType.STRING;
    const fieldOptions = typeof typeOrOptions !== "string" ? (typeOrOptions as FieldOptions<T>) : options;
    return (target: any, propertyKey: string): void => {
        if ([FieldType.COMPONENT, FieldType.RELATION].includes(type) && !fieldOptions?.builder) {
            throw new Error(`Builder not provided`);
        }
        const fields: Field<T>[] = Reflect.getMetadata(CONSTANTS.FIELDS_KEY, target.constructor) ?? [];
        fields.push({ key: propertyKey as keyof T, type, options: fieldOptions });
        Reflect.defineMetadata(CONSTANTS.FIELDS_KEY, fields, target.constructor);
    };
}
