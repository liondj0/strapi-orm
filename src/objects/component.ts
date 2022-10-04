import { StrapiObject } from "./strapi-object";
import { parseFieldsFromRawData } from "../util/fieldUtil";

export abstract class Component extends StrapiObject {
    parseComponentFromRawData<T extends Component>(data: Partial<T>): T | T[] {
        return parseFieldsFromRawData<T>(this as unknown as T, data);
    }
}
