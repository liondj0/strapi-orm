import { cloneDeep } from "lodash";

export const objectUtil = {
    deepClone: <T>(obj: T): T => {
        return cloneDeep(obj) as T;
    },
};
