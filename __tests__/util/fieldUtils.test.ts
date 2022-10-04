

// @ts-ignore
import {parseFieldsFromRawData} from "../../src/util/fieldUtil";
import {Home} from "../mocs/entities/home";
import {homeRawData} from "../mocs/data/home";
import {Meta} from "../mocs/entities/components/meta";
import {Image} from "../mocs/entities/components/image";

describe("fieldUtil", () => {
    describe("parseFieldsFromRawData", () => {
        it("should return an object of right type", () => {
            const homeData = parseFieldsFromRawData(new Home(), homeRawData as any) as Home;
            // const homeData = new Home().parseEntity(homeRawData as any) as Home;
            // console.log(homeData.meta)
            expect(homeData instanceof Home).toBeTruthy();
            expect(homeData.meta instanceof Meta).toBeTruthy();
            expect(homeData.headers[0] instanceof Meta).toBeTruthy();
            expect(homeData.image instanceof Image).toBeTruthy();
        })
        it("should show non relation values", () => {
            const homeData = parseFieldsFromRawData(new Home(), homeRawData as any) as Home;
            expect(homeData.text).toBe(homeRawData.text);
            expect(homeData.meta.title).toBe(homeRawData.meta.title);
            expect(homeData.meta.description).toBe(homeRawData.meta.description);
            expect(homeData.meta.image.src).toBe(homeRawData.meta.image.data.attributes.src);
            expect(homeData.image.src).toBe(homeRawData.image.data.attributes.src);
        })
    })
})
