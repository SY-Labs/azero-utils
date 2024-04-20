**Azero-Utils**

Azero-Utils is a utility package designed to facilitate interaction within the Aleph zero ecosystem. This repository provides efficient event scraping functionality based on subscribers and offers a convenient and simple user interface, akin to the style of Polkadot.js.

### Features

- **Event Scraping**: Efficiently scrape events based on subscribers.
- **Simple Interface**: Provides a straightforward interface for ease of use.
- **Aleph Zero Ecosystem**: Tailored specifically for interactions within the Aleph zero ecosystem.

### Installation

```bash
npm install azero-utils
```

### Example Usage

```javascript
import { ApiPromise, WsProvider } from '@polkadot/api';
import { ContractEvents } from "./ContractEvents"
import { ContractPromise } from '@polkadot/api-contract';

// Connect to Aleph zero node
const wsProvider = new WsProvider("wss://ws.test.azero.dev");
const api = await ApiPromise.create({ provider: wsProvider });

// Instantiate contract and initialize contract events
const contract = new ContractPromise(api, metadata, "<contract address>");
let contractEvents = new ContractEvents(contract);

// Subscribe to new events
contractEvents.subscribeNewEvents(
    (event) => console.log("Event!:", event)
);
```