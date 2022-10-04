

//@ts-ignore
import {getFlatRelationsForObject} from "../../src/util/relationUtil";
import {Home} from "../mocs/entities/home";

describe("relationUtil",  () => {
    describe("getFlatRelationsForObject", () => {
        it("should flatten all relations for home object", () => {
            const relations = getFlatRelationsForObject(Home);
            expect(relations[0]).toBe("meta");
            expect(relations[1]).toBe("meta.image");
            expect(relations[2]).toBe("headers");
            expect(relations[3]).toBe("headers.image");
            expect(relations[4]).toBe("image");
        })
    })
})
