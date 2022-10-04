import {Image} from "./image";
import {field} from "../../../../src/fields/field";
import {FieldType} from "../../../../src/enums/field-type";
import {StrapiObject} from "../../../../src/objects/strapi-object";

export class Meta extends StrapiObject{
    constructor() {
        super();
    }
    @field(FieldType.STRING)
    title!: string;
    @field(FieldType.STRING)
    description!: string;
    @field(FieldType.RELATION, {builder: () => new Image()})
    image!: Image;

    getInstance(): typeof Meta {
        return Meta;
    }
}
