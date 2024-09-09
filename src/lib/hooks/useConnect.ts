import { useState } from "react";
import { activeAccountStore } from "../stores/createStoreManager";
import { ACTIVE_WALLET_ID } from "../constants/webStorage";
import { Chain } from "../interfaces/chain-type";

type Options = {
    chain?: Chain
}

export default function useConnect(options?: Options) {

    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState(null);

    const handleStoredAccount = (accounts: string[], providerInfo: EIP6963ProviderInfo) => {
        setError(null);

        // save in localStorage
        localStorage.setItem(ACTIVE_WALLET_ID, providerInfo?.rdns)

        // save into external store.
        activeAccountStore.setValue({ address: accounts?.[0] });
    }

    const onConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
        const accounts = await providerWithInfo.provider.request({ method: "eth_requestAccounts" })
            .catch((e) => setError(e))
            .finally(() => setIsConnecting(false));

        if (accounts?.length) {
            return handleStoredAccount(accounts, providerWithInfo?.info);
        }
    }

    const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
        setIsConnecting(true);

        if (options?.chain) {
            return providerWithInfo.provider?.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: options?.chain?.id }]
            })
                .then(async () => onConnect(providerWithInfo))
                .catch((e) => setError(e));
        }

        onConnect(providerWithInfo);
    }

    return { connect: handleConnect, isConnecting, error };
}