import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "../types"
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  Theme,
} from "@rainbow-me/rainbowkit";

import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";

import { goerli, mainnet } from "wagmi/chains";

import { publicProvider } from "wagmi/providers/public";
import merge from "lodash.merge";


import { SessionProvider, useSession } from 'next-auth/react';

const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: "#8c0017",
  },
} as Theme);

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    goerli,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Fright Club",
  projectId: "fddb4be4fdb6543b8aa397326e84503f",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {

  

  return (
    <WagmiConfig config={wagmiConfig}>
      <SessionProvider refetchInterval={0} session={pageProps.session}>
          <RainbowKitProvider chains={chains} theme={myTheme}>
            <Component {...pageProps} />
          </RainbowKitProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;