import {Entity} from "../../../../src/objects/entity";
import {field} from "../../../../src/fields/field";


export class Image extends Entity {
    @field()
    src!: string;

    getInstance(): typeof Image {
        return Image;
    }
}
