import { StrapiObject } from "../objects/strapi-object";
import { WhereOperator } from "../enums/where-operator";

type QueryItem = { field: string; value: string | string[] };
type WhereQueryItem = { value: string | string[]; operator: WhereOperator; field: string };
type SortQueryItem = { field: string; value: "ASC" | "DESC" };
export type Query<T extends StrapiObject> = { where?: WhereQueryItem | WhereQueryItem[]; sort?: SortQueryItem | SortQueryItem[] };

export const mapQueryItemsToString = (queryType: string, items: QueryItem[]): string => {
    const queryParts: string[] = [];
    items.map(({ value, field }) => {
        if (typeof value === "string") return queryParts.push(`${field}=${value}`);
        value.forEach((val, index) => queryParts.push(`${field}[${index}]=${val}`));
    });
    return `${queryType}${queryParts.join(`&${queryType}`)}`;
};

export const createWhereQuery = (where: WhereQueryItem | WhereQueryItem[]): string => {
    const filters = Array.isArray(where) ? where : [where];
    const mappedFilters: QueryItem[] = filters.map(({ field, operator, value }) => ({ field: `${field}[${operator}]`, value }));
    return mapQueryItemsToString("filters", mappedFilters);
};

export const createSortQuery = (sort: SortQueryItem | SortQueryItem[]) => {
    return mapQueryItemsToString("sort", Array.isArray(sort) ? sort : [sort]);
};

export const createQuery = <T extends StrapiObject>(query: Query<T>): string => {
    const queryParams: string[] = [];
    if (query.where) queryParams.push(createWhereQuery(query.where));
    if (query.sort) queryParams.push(createSortQuery(query.sort));
    return queryParams.join("&");
};
