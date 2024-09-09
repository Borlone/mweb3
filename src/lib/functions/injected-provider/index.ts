import { store } from "@/lib/stores/providerStore";

export function injectedProvider(rdns: string) {
    const providers = store.value();
    return providers?.find((p) => p.info.rdns === rdns)
}