import {Meta} from "./components/meta";
import {field} from "../../../src/fields/field";
import {FieldType} from "../../../src/enums/field-type";
import {Image} from "./components/image";
import {StrapiObject} from "../../../src/objects/strapi-object";

export class Home extends StrapiObject{

    constructor() {
        super()
    }

    @field(FieldType.COMPONENT, {builder: () => new Meta()})
    meta!: Meta;

    @field(FieldType.COMPONENT, {builder: () => new Meta()})
    headers!: Meta[];

    @field(FieldType.RELATION, {builder: () => new Image(), mapper: (image) => `${image.src}`})
    image!: string;

    @field()
    text!: string;

    getInstance(): typeof Home {
        return Home;
    }


}
