import { createStore } from "./createStore";

type Account = {
    address: string;
}

type Chain = {
    id: string;
}

const activeAccountStore = createStore<Account | undefined>(undefined);
const activeChainStore = createStore<Chain | undefined>(undefined);

export {
    activeAccountStore,
    activeChainStore
}