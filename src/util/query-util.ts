import { StrapiObject } from "../objects/strapi-object";
import { WhereOperator } from "../enums/where-operator";

type WhereFilter = { value: string | string[]; operator: WhereOperator; field: string };

export type Query<T extends StrapiObject> = { where?: WhereFilter | WhereFilter[] };

export const createWhereQuery = (where: WhereFilter | WhereFilter[]): string => {
    const filters = Array.isArray(where) ? where : [where];
    const flatFilters: string[] = [];
    filters.forEach(({ value, field, operator }) => {
        if (typeof value === "string") flatFilters.push(`${field}[${operator}]=${value}`);
        else
            value.forEach((item, index) => {
                flatFilters.push(`${field}[${operator}][${index}]=${item}`);
            });
    });
    return `filters${flatFilters.join("&filters")}`;
};

export const createQuery = <T extends StrapiObject>(query: Query<T>): string => {
    const queryParams: string[] = [];
    if (query.where) queryParams.push(createWhereQuery(query.where));

    return queryParams.join("&");
};
