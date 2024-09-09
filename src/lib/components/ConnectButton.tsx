import Image from "next/image";
import useConnect from "../hooks/useConnect";
import { useProviders } from "../hooks/useProviders";
import useActiveAccount from "../hooks/useActiveAccount";
import useDisconnect from "../hooks/useDisconnect";
import { sepolia } from '@/lib/constants/supportedChain';
import useSwitchActiveChain from "../hooks/useSwitchActiveChain";
import useSign from "../hooks/useSign";

export default function ConnectButton() {
    const providers = useProviders();
    const account = useActiveAccount();
    const { connect, error, isConnecting } = useConnect({ chain: sepolia });
    const { disconnect } = useDisconnect();
    const { switchChain } = useSwitchActiveChain()
    const { sign } = useSign();

    return (
        <div className="wallet-container">
            {account ?
                <div>
                    <button onClick={disconnect}>Disconnect</button>
                </div> :
                providers?.length ? providers?.map((provider) => (
                    <button key={provider.info.uuid} className="wallet-btn" onClick={() => connect(provider)} >
                        <Image src={provider.info.icon} alt={provider.info.name} width={24} height={24} />
                        <div>{provider.info.name}</div>
                    </button>
                )) : (
                    <p>No Injected Providers</p>
                )}
        </div>
    )
}