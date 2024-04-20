import { ContractPromise } from "@polkadot/api-contract";
import { DecodedEvent } from "@polkadot/api-contract/types";
import { EventRecord } from '@polkadot/types/interfaces';

const EVENT_METADATA_NAME = "ContractEmitted"

enum DataIndex {
    Contract = 0,
    Data = 1
}

export class ContractEvents {
    private contract: ContractPromise

    constructor(contract: ContractPromise) {
        this.contract = contract
    }

    subscribeNewEvents(callback: (event: DecodedEvent) => void) {
        this.contract.api.query.system.events((events: [EventRecord]) => {
            events
                .filter(event => event.event.meta.name.toString() == EVENT_METADATA_NAME
                    && event.event.data[DataIndex.Contract].toString() == this.contract.address.toString())
                .forEach(event => callback(this.contract.abi.decodeEvent(event)))
        })
    }
}