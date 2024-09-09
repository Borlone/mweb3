import { useEffect, useState } from "react";
import { useProviders } from "./useProviders";
import { ACTIVE_WALLET_ID } from "../constants/webStorage";
import useActiveAccount from "./useActiveAccount";

export default function useActiveProvider() {
    const providers = useProviders();
    const account = useActiveAccount();

    const [activeProvider, setActiveProvider] = useState<EIP1193Provider>();

    useEffect(() => {
        if (!providers?.length) return;

        const activeWalletId = localStorage.getItem(ACTIVE_WALLET_ID);
        const activeProviderDetail = providers?.find((p) => p?.info?.rdns === activeWalletId);
        const provider = activeProviderDetail?.provider;

        setActiveProvider(provider);
    }, [providers, account])

    return activeProvider;
}