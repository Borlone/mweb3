import { useEffect, useState } from "react";
import { activeAccountStore } from "../stores/createStoreManager";
import useActiveProvider from "./useActiveProvider";

export default function useAutoConnect() {
    const activeProvider = useActiveProvider();

    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!activeProvider) return;

        if (activeProvider) {
            setIsConnecting(true);
            activeProvider?.request({ method: 'eth_accounts' })
                .then((accounts) => {
                    setError(null)
                    activeAccountStore.setValue(accounts?.[0] ? { address: accounts?.[0] } : undefined);
                })
                .catch((e) => setError(e))
                .finally(() => setIsConnecting(false))
        }
    }, [activeProvider])

    return { isConnecting, error };
}