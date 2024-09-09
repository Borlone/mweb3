import { useState } from "react";
import { activeAccountStore } from "../stores/createStoreManager";
import { ACTIVE_WALLET_ID } from "../constants/webStorage";
import useActiveProvider from "./useActiveProvider";

export default function useDisconnect() {
    const activeProvider = useActiveProvider();

    const [error, setError] = useState(null);

    const handleClearAccount = () => {
        // clear in localStorage
        localStorage.removeItem(ACTIVE_WALLET_ID)

        // remove into external store.
        activeAccountStore.setValue(undefined);
    }

    const handleDisconnect = () => {
        if (!activeProvider) return;

        activeProvider.request({
            method: "wallet_revokePermissions",
            params: [{ eth_accounts: {} }]
        })
            .then(() => {
                setError(null);
                handleClearAccount();
            })
            .catch((e) => setError(e))
            .finally(() => handleClearAccount())
    }

    return { disconnect: handleDisconnect, error };
}