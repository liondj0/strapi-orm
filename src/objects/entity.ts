import { StrapiObject } from "./strapi-object";
import { parseFieldsFromRawData } from "../util/fieldUtil";

export abstract class Entity extends StrapiObject {
    parseEntity(data: Partial<Entity>): Entity | Entity[] {
        return parseFieldsFromRawData(this, data);
    }
}
