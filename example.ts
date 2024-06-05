import {
    type DeepMergeFunctionURItoKind,
    type DeepMergeFunctionsURIs,
    type DeepMergeLeaf,
    deepmergeCustom,
} from "deepmerge-ts";

const customizedDeepmerge = deepmergeCustom<
    unknown, // <-- Types that can be passed into the function.
    {
        DeepMergeOthersURI: "MyDeepMergeDatesURI"; // <-- Needed for correct output type.
    }
>({
    mergeOthers: (values, utils, meta) => {
        // If every value is a date, the return the amalgamated array.
        if (values.every((value) => value instanceof Date)) {
            return values;
        }
        // Otherwise, use the default merging strategy.
        return utils.defaultMergeFunctions.mergeOthers(values);
    },
});

const x = { foo: new Date("2020-01-01") };
const y = { foo: new Date("2021-02-02") };
const z = { foo: new Date("2022-03-03") };

customizedDeepmerge(x, y, z); // => { foo: [Date, Date, Date] }

declare module "deepmerge-ts" {
    interface DeepMergeFunctionURItoKind<
        Ts extends ReadonlyArray<unknown>,
        Fs extends DeepMergeFunctionsURIs,
        M
    > {
        readonly MyDeepMergeDatesURI: EveryIsDate<Ts> extends true ? Ts : DeepMergeLeaf<Ts>;
    }
}

type EveryIsDate<Ts extends ReadonlyArray<unknown>> = Ts extends readonly [
    infer Head,
    ...infer Rest
]
    ? Head extends Date
        ? EveryIsDate<Rest>
        : false
    : true;
