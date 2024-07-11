# NMOS
* Typescript Types for NMOS responses
* Zod validation (strict or not)

## What does this solve?
* In a world of full of standard hating NMOSers, this makes sure the responses are getting are valid
* TypeScript types for a good developer experience

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

(async () => {

    // Get self/node
    const node = await nmos.get('/node/v1.3/self');
    console.log(node);

    // Get a specific device
    const device = await nmos.get('/node/v1.3/devices/{device_id}', { devicd_id: "578aa0b3-992d-5ce0-9b4b-1d7b9713c4f2" });
    console.log(device);

})();
```

## IS-04
This module currently only support GET requests for IS-04.

## 