import { WhereOperator } from "../enums/where-operator";

type QueryItem = { field: string; value: string | string[] };
type WhereQueryItem = { value: string | string[]; operator: WhereOperator; field: string };
type SortQueryItem = { field: string; value: "ASC" | "DESC" };
export type Query = { where?: WhereQueryItem | WhereQueryItem[]; sort?: SortQueryItem | SortQueryItem[]; relations?: string[] };

export const mapQueryItemsToString = (queryType: string, items: QueryItem[]): string[][] => {
    const queryParts: string[][] = [];
    items.map(({ value, field }) => {
        if (typeof value === "string") return queryParts.push([`${queryType}${field}`, value]);
        value.forEach((val, index) => queryParts.push([`${queryType}${field}[${index}]`, val]));
    });
    return queryParts;
};

export const createWhereQuery = (where: WhereQueryItem | WhereQueryItem[]): string[][] => {
    const filters = Array.isArray(where) ? where : [where];
    const mappedFilters: QueryItem[] = filters.map(({ field, operator, value }) => ({ field: `${field}[${operator}]`, value }));
    return mapQueryItemsToString("filters", mappedFilters);
};

export const createSortQuery = (sort: SortQueryItem | SortQueryItem[]): string[][] => {
    return mapQueryItemsToString("sort", Array.isArray(sort) ? sort : [sort]);
};

export const createQuery = (query: Query): string[][] => {
    const queryParams: string[][] = [];
    if (query.relations) queryParams.push(...query.relations.map(r => [`populate`, r]));
    if (query.where) queryParams.push(...createWhereQuery(query.where));
    if (query.sort) queryParams.push(...createSortQuery(query.sort));
    return queryParams;
};
