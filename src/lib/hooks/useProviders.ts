import { useSyncExternalStore } from "react"
import { store } from "../stores/providerStore"

export const useProviders = () =>
  useSyncExternalStore(store.subscribe, store.value, store.value)