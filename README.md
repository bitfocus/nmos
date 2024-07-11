# NMOS
* Typescript types response objects
* Zod validation (strict or not)

## What does this solve?
* In a world filled with those who disregard standards, this ensures the responses you receive comply with the standard. If they don't, you'll be informed, allowing you to handle it appropriately.
* TypeScript types for a good developer experience

## What is this really?
AMWAs IS-04 JSON schema files, converted to zod, structured to their respective URLs with an Axios HTTP library to fetch the resources.

## Install
Depending on your package manager
```
pnpm i @bitfocus/nmos
yarn add @bitfocus/nmos
npm i @bitfocus/nmos
```
## Usage
```typescript
import NMOS from '@bitfocus/nmos'

const nmos = new NMOS({
    protocol: 'http',
    host: '10.0.0.3',
    port: 8090,
    basePath: '/x-nmos'
})

// Get self/node
const node = await nmos.get('/node/v1.3/self');
console.log(node);

// Get a specific device
const device = await nmos.get('/node/v1.3/devices/{device_id}', { device_id: "578aa0b3-992d-5ce0-9b4b-1d7b9713c4f2" });
console.log(device);
```

## IS-04
This module currently only support GET requests for IS-04.

## Author
William Viker <william@bitfocus.io>
Bitfocus AS

## Links
* [https://specs.amwa.tv/is-04/](https://specs.amwa.tv/is-04/)
* [https://www.npmjs.com/package/json-schema-to-zod](https://www.npmjs.com/package/json-schema-to-zod)
* [https://www.npmjs.com/package/json-refs9](https://www.npmjs.com/package/json-refs)