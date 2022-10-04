import {Image} from "./image";
import {Component} from "../../../../src/objects/component";
import {field} from "../../../../src/fields/field";
import {FieldType} from "../../../../src/enums/field-type";

export class Meta extends Component{
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
