# NMOS + TypeScript = 🚀

-   yarn
-   yarn submodules

## Tools

-   yarn tool:generate

### Why is there a custom generator?

In late 2023 when starting to work on this generator, there were not any maintained options for translating the api from RAML into Typescript.
Even trying to convert the numerous json schemas into typescript resulted in quite a mess of duplicated types and name collisions.

If AMWA translate the types into openapi in the future, or use that for future versions of the specs then hopefully this can be revisited in the future.
