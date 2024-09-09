import { useEffect, useSyncExternalStore } from "react";
import useActiveProvider from "./useActiveProvider";
import { activeChainStore } from "../stores/createStoreManager";

export default function useChainId() {
    const activeProvider = useActiveProvider();

    const handleChangeChain = (chainId: string) => {
        activeChainStore.setValue({ id: chainId });
    }

    useEffect(() => {
        (async () => {
            const chainId = await activeProvider?.request({ method: 'eth_chainId' });
            activeChainStore.setValue({ id: chainId });
        })();

        activeProvider?.on('chainChanged', handleChangeChain);

        return () => activeProvider?.removeListener('chainChanged', handleChangeChain);
    }, [activeProvider]);

    return useSyncExternalStore(activeChainStore.subscribe, activeChainStore.getValue, activeChainStore.getValue);
}