import {createWhereQuery, mapQueryItemsToString} from "../../src/util/query-util";
import {WhereOperator} from "../../src/enums/where-operator";

describe("queryUtil", () => {
    describe("mapQueryItemsToString", () => {
        it("should create query params", () => {
            const items = [{value: "ASC", field: "[id]"}, {value: "DESC", field: "[id]"}, {value: "DESC", field: "[id]"}]
            const result = mapQueryItemsToString("sort", items);
            expect(result).toBe('sort[id]=ASC&sort[id]=DESC&sort[id]=DESC');
        })
        it("should map value array to array of params", () => {
            const items = [{value: "ASC", field: "[id]"}, {value: ["DESC", "ASC"], field: "[id]"}]
            const result = mapQueryItemsToString("sort", items);
            expect(result).toBe('sort[id]=ASC&sort[id][0]=DESC&sort[id][1]=ASC');
        })
    })
    describe("createWhereQuery", () => {
        it("should create a where query", () => {
            const result = createWhereQuery({value: "1234", field: "[id]", operator: WhereOperator.EQUALS});
            expect(result).toBe('filters[id][$eq]=1234')
        })
        it("should create a list of values if value is array", () => {
            const result = createWhereQuery({value: ["1234", "4321"], field: "[id]", operator: WhereOperator.IN});
            expect(result).toBe('filters[id][$in][0]=1234&filters[id][$in][1]=4321');
        })
    })
})
