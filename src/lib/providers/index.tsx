import { Fragment, ReactNode, useEffect } from "react"
import useActiveProvider from "../hooks/useActiveProvider";
import useActiveAccount from "../hooks/useActiveAccount";
import { activeAccountStore } from '../stores/createStoreManager'
import { ACTIVE_WALLET_ID } from "../constants/webStorage";

type Props = {
    children?: ReactNode;
}

export default function MWeb3Provider({ children }: Props) {
    const activeProvider = useActiveProvider();
    const activeAccount = useActiveAccount();

    // eth_accounts always returns an array.
    const handleAccountsChanged = (accounts: string[]) => {
        if (accounts?.length === 0) {
            activeAccountStore.setValue(undefined);
            localStorage.removeItem(ACTIVE_WALLET_ID);
            return;
        }

        if (accounts?.length && accounts?.[0] !== activeAccount?.address) {
            activeAccountStore.setValue({ address: accounts?.[0] })
        }
    }

    const handleconnect = (connectInfo: { chainId: string }) => {
        // console.log(connectInfo)
    }

    useEffect(() => {
        if (!activeProvider) return;

        activeProvider.request({ method: 'eth_accounts' })
            .then(handleAccountsChanged)
            .catch((e) => console.log(e))

        // activeProvider.on('connect', handleconnect);
        activeProvider?.on('disconnect', handleAccountsChanged);
        activeProvider?.on('accountsChanged', handleAccountsChanged);

    }, [activeProvider])

    return (
        <Fragment>
            {children}
        </Fragment>
    )
}