import { useState } from "react";
import useActiveProvider from "./useActiveProvider";
import { Chain } from "../interfaces/chain-type";

export default function useSwitchActiveChain() {
    const activeProvider = useActiveProvider();

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const handleSwitchChain = async (chain: Chain) => {
        setIsPending(true);

        await activeProvider?.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chain.id }]
        })
            .then(() => setError(null))
            .catch((e) => setError(e))
            .finally(() => setIsPending(false))
    }

    return { switchChain: handleSwitchChain, isPending, error };
}