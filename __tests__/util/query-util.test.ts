import {createWhereQuery} from "../../src/util/query-util";
import {WhereOperator} from "../../src/enums/where-operator";

describe("queryUtil", () => {
    describe("createWhereQuery", () => {
        it("should create a where query", () => {
            const result = createWhereQuery({value: "1234", field: "[id]", operator: WhereOperator.EQUALS});
            expect(result).toBe('filters[id][$eq]=1234')
        })
        it("should create a list of values if value is array", () => {
            const result = createWhereQuery({value: ["1234", "4321"], field: "[id]", operator: WhereOperator.IN});
            expect(result).toBe('filters[id][$in][0]=1234&filters[id][$in][1]=4321')
        })
    })
})
