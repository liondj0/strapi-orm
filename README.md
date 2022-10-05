# Strapi ORM v1.0.2

Strapi ORM is a package that makes creating requests and mapping responses from strapi cms easy. 


# Usage



## Fields

Mark fields that you created in you strapi cms, and they will be mapped from response to your object. ``FieldType.COMPONENT`` and ``FieldType.RELATION`` are relations that will be mapped from strapi's response type to their respective definitions. Components in strapi are mapped as plain objects, while relations are wrapped in `relations: {data: {id: number, attributes: RelationData}}`. This will be mapped to classes/objects that you defined.

```
import {field, FieldType, StrapiObject} from "strapi-orm";
export class Relation extands StrapiObject {
    @field()
    foo!: string;
    @field()
    bar!: string;
}

export class Home extends StrapiObject {
    
    @field()
    baz!: string;
    
    @field(FieldType.Relation, {builder: () => new Relation()})
    relation: Relation;
    
}    
```

You can also provide custom mappers to map your data as you wish. 
For example, strapi image has a bunch of properties, but src is the most important, and as a relation, it is returned as:
```
ObjectWithImage {
    image: {
        data: {
            attributes: {
                src: string;
                ...
            }
        }
    }
}
```
This can be marked with an Image class and an object that has an Image relation:
```
class Image extends StrapiObject {

    @field()
    src: string;
    
}

class ObjectWithImage extends StrapiObject {

    @field(FieldType.RELATION, {builder: () => new Image})
    image: Image;

}
```
 But, this can be abstracted, so the Image is transformed to just URL if other properties are not used:
 ```
 class ObjectWithImage extends StrapiObject {

    @field(FieldType.RELATION, {builder: () => new Image, mapper: image => image.src})
    image: string;

}
 ```



## Relations

Strapi requires the list of all nested relation to fetch all data provided on one object. To use the earlier example of the Home class, this can be done like:
```
import {getFlatRelationsForObject} from "strapi-orm/lib/util/relationUtil";

export class Relation extands StrapiObject {
    @field()
    foo!: string;
    @field(FieldType.COMPONENT, {builder: () => new SomeComponent()})
    bar!: SomeComponent;
}

export class Home extends StrapiObject {
    
    @field()
    baz!: string;
    
    @field(FieldType.Relation, {builder: () => new Relation()})
    relation: Relation;
    
    @field(FieldType.Relation, {builder: () => new Image()})
    image: Image
    
}   

const relations = getFlatRelationsForObject(getFlatRelationsForObject);
// relations -> ['relation', 'relation.bar', 'image']
```

### Note that relations will be named according to the property names and should match strapi names
