import {createWhereQuery, mapQueryItemsToString} from "../../src/util/query-util";
import {WhereOperator} from "../../src/enums/where-operator";

describe("queryUtil", () => {
    describe("mapQueryItemsToString", () => {
        it("should create query params", () => {
            const items = [{value: "ASC", field: "[id]"}, {value: "DESC", field: "[id]"}, {value: "DESC", field: "[id]"}]
            const result = mapQueryItemsToString("sort", items);
            expect(result[0][0]).toBe('sort[id]');
            expect(result[0][1]).toBe('ASC');
            expect(result[1][0]).toBe('sort[id]');
            expect(result[1][1]).toBe('DESC');
            expect(result[2][0]).toBe('sort[id]');
            expect(result[2][1]).toBe('DESC');
        })
        it("should map value array to array of params", () => {
            const items = [{value: "ASC", field: "[id]"}, {value: ["DESC", "ASC"], field: "[id]"}]
            const result = mapQueryItemsToString("sort", items);
            expect(result[0][0]).toBe('sort[id]');
            expect(result[0][1]).toBe('ASC');
            expect(result[1][0]).toBe('sort[id][0]');
            expect(result[1][1]).toBe('DESC');
            expect(result[2][0]).toBe('sort[id][1]');
            expect(result[2][1]).toBe('ASC');
        })
    })
    describe("createWhereQuery", () => {
        it("should create a where query", () => {
            const result = createWhereQuery({value: "1234", field: "[id]", operator: WhereOperator.EQUALS});
            expect(result[0][0]).toBe('filters[id][$eq]');
            expect(result[0][1]).toBe('1234');
        })
        it("should create a list of values if value is array", () => {
            const result = createWhereQuery({value: ["1234", "4321"], field: "[id]", operator: WhereOperator.IN});
            expect(result[0][0]).toBe('filters[id][$in][0]');
            expect(result[0][1]).toBe('1234');
            expect(result[1][0]).toBe('filters[id][$in][1]');
            expect(result[1][1]).toBe('4321');
        })
    })
})
