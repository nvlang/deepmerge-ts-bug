
### Steps to reproduce

1. `pnpm install`
2. `tsc`

#### Expected

No errors.

#### Actual

```
example.ts:20:44 - error TS2554: Expected 2 arguments, but got 1.

20         return utils.defaultMergeFunctions.mergeOthers(values);
                                              ~~~~~~~~~~~

  node_modules/.pnpm/deepmerge-ts@7.0.2/node_modules/deepmerge-ts/dist/node/index.d.mts:626:95
    626 declare function mergeOthers<Ts extends ReadonlyArray<unknown>>(m_target: Reference<unknown>, values: Ts): void;
                                                                                                      ~~~~~~~~~~
    An argument for 'values' was not provided.


Found 1 error in example.ts:20
```
