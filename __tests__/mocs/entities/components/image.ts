import {field} from "../../../../src/fields/field";
import {StrapiObject} from "../../../../src/objects/strapi-object";


export class Image extends StrapiObject {
    @field()
    src!: string;

    getInstance(): typeof Image {
        return Image;
    }
}
