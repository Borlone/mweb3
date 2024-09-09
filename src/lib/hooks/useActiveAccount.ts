import { useSyncExternalStore } from "react";
import { activeAccountStore } from "../stores/createStoreManager";

export default function useActiveAccount() {
    return useSyncExternalStore(activeAccountStore.subscribe, activeAccountStore.getValue, activeAccountStore.getValue)
}