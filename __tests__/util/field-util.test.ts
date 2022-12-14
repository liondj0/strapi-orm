import {parseFieldsFromRawData} from "../../src/util/field-util";
// TODO: Resolve issues with tests
//@ts-ignore
import {Home} from "../mocs/entities/home";
// TODO: Resolve issues with tests
//@ts-ignore
import {homeRawData} from "../mocs/data/home";
import {Meta} from "../mocs/entities/components/meta";
import {field, FieldType} from "../../src";

describe("fieldUtil", () => {
    describe("parseFieldsFromRawData", () => {
        it("should return an object of right type", () => {
            const homeData = parseFieldsFromRawData(new Home(), homeRawData as any) as Home;
            // const homeData = new Home().parseEntity(homeRawData as any) as Home;
            // console.log(homeData.meta)
            expect(homeData instanceof Home).toBeTruthy();
            expect(homeData.meta instanceof Meta).toBeTruthy();
            expect(homeData.headers[0] instanceof Meta).toBeTruthy();
        })
        it("should show non relation values", () => {
            const homeData = parseFieldsFromRawData(new Home(), homeRawData as any) as Home;
            expect(homeData.text).toBe(homeRawData.text);
            expect(homeData.meta.title).toBe(homeRawData.meta.title);
            expect(homeData.meta.description).toBe(homeRawData.meta.description);
            expect(homeData.meta.image.src).toBe(homeRawData.meta.image.data.attributes.src);
        })
        it("should map fields with mapper provided", () => {
            const homeData = parseFieldsFromRawData(new Home(), homeRawData as any) as Home;
            expect(homeData.image).toBe(homeRawData.image.data.attributes.src)
        })
        it("should map unavailable data to undefined", () => {
            class HomeExtended extends Home {
                @field(FieldType.COMPONENT, {nullable: true, builder: () => new Meta()})
                optMeta?: Meta

                getInstance() {
                    return HomeExtended;
                }
            }
            const homeData = parseFieldsFromRawData(new HomeExtended(), homeRawData as any) as HomeExtended;
            expect(homeData.meta).toBeDefined()
            expect(homeData.image).toBeDefined()
            expect(homeData.optMeta).toBeUndefined()
        })
    })
})
