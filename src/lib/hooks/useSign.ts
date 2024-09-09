import useActiveAccount from "./useActiveAccount"
import useActiveProvider from "./useActiveProvider";

export default function useSign() {
    const account = useActiveAccount();
    const activeProvider = useActiveProvider();

    const siweSign = async () => {
        const domain = window.location.host
        const from = account?.address;
        const siweMessage = `${domain} wants you to sign in with your Ethereum account:\n${from}\n\nI accept the MetaMask Terms of Service: https://community.metamask.io/tos\n\nURI: https://${domain}\nVersion: 1\nChain ID: 1\nNonce: 32891757\nIssued At: 2021-09-30T16:25:24.000Z`

        try {
            const msg = `0x${Buffer.from(siweMessage, "utf8").toString("hex")}`
            const sign = await activeProvider?.request({
                method: "personal_sign",
                params: [msg, from],
            })

            console.log(sign);
        } catch (err) {
            console.error(err)
        }
    }

    return { sign: siweSign }
}