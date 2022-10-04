import {Meta} from "./components/meta";
import {field} from "../../../src/fields/field";
import {FieldType} from "../../../src/enums/field-type";
import {Entity} from "../../../src/objects/entity";
import {Image} from "./components/image";

export class Home extends Entity{

    constructor() {
        super()
    }

    @field(FieldType.COMPONENT, {builder: () => new Meta()})
    meta!: Meta;

    @field(FieldType.COMPONENT, {builder: () => new Meta()})
    headers!: Meta[];

    @field(FieldType.RELATION, {builder: () => new Image()})
    image!: Image;

    @field()
    text!: string;

    getInstance(): typeof Home {
        return Home;
    }


}
