import { parseFieldsFromRawData } from "../util/field-util";

export abstract class StrapiObject {
    abstract getInstance(): typeof StrapiObject;
    parseData<T extends StrapiObject>(data: Partial<T>): T | T[] {
        return parseFieldsFromRawData<T>(this as unknown as T, data);
    }
}
