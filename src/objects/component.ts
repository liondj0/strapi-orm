import {StrapiObject} from "./strapi-object";
import {parseFieldsFromRawData} from "../util/fieldUtil";


export abstract class Component extends StrapiObject {

    parseComponentFromRawData(data: Partial<Component>): Component | Component[] {
        return parseFieldsFromRawData(this, data)
    }
}
