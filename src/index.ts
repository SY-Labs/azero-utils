import { ApiPromise, WsProvider } from '@polkadot/api';
import { Header,Event } from '@polkadot/types/interfaces';

import { ContractPromise } from '@polkadot/api-contract';

import psp22metdata from "./psp22.json";

// The address is the actual on-chain address as ss58 or AccountId object.

const wsProvider = new WsProvider("wss://ws.aleph-validator-node.iosis.tech");
const api = await ApiPromise.create({ provider: wsProvider });

const contract = new ContractPromise(api, psp22metdata, "5Dvb5E8zKU4E9c7YxfNL5VC8YQj4VAFUTCGYY9ayFLnnY3UA");

api.rpc.chain.subscribeNewHeads((lastHead: Header): void => {
    console.log('current header:', JSON.stringify(lastHead.hash.toHex()));
});

// // only 1 param needed, the actual address we are querying for (more
// // params can follow at the end, separated by , if needed by the message)
// const callValue = await contract.query["psp22Metadata::tokenName"]("5CJzYSKs56uLoDGhA142evVg4PUnE7tuawEv9GsdKcCiEiHt", {})
// console.log(callValue.output)

api.query.system.events((events: [Event]) => {
    events.forEach(e => console.log('event hash: ', e.hash.toHex()))
})