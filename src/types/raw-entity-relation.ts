export type RawEntityRelation<Entity> = { data: { attributes: Entity } } | { data: { id: number; attributes: Entity }[] };
