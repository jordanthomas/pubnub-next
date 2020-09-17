import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import type { AppProps } from "next/app";
import "../styles/styles.css";

const pubnub = new PubNub({
  subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUBSCRIBE_KEY || "",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PubNubProvider client={pubnub}>
      <Component {...pageProps} />
    </PubNubProvider>
  );
}

export default MyApp;
