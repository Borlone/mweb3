import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MWeb3Provider from '@/lib/providers'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MWeb3Provider>
      <Component {...pageProps} />
    </MWeb3Provider>
  );
}
