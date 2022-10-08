import { StrapiObject } from "./strapi-object";
import { createQuery, Query } from "../util/query-util";
import axios from "axios";
import { getFlatRelationsForObject } from "../util/relationUtil";

export abstract class Entity extends StrapiObject {
    async fetch(url: string, query?: Query) {
        const queryWithDefaultRelations: Query = { ...(query ?? {}), ...{ relations: query?.relations ?? getFlatRelationsForObject(this.getInstance()) } };
        const data = (await axios.get(url, { params: new URLSearchParams(createQuery(queryWithDefaultRelations)) })).data.data;
        if (Array.isArray(data)) return data.map(i => this.parseData(i.attributes));
        return this.parseData(data.attributes);
    }
}
