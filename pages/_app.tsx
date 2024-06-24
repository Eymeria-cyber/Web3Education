import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  lineaSepolia,
} from 'wagmi/chains'
import { getDefaultConfig, lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { NextUIProvider } from '@nextui-org/react'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import Head from 'next/head'

const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    lineaSepolia,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
})

const client = new QueryClient()

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <NextUIProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider theme={lightTheme({
            accentColor: '#9999ff',
            accentColorForeground: 'white',
          })}>
            <Head>
              <title>W3E</title>
              <meta
                name="description"
                content="Web3 Education - Learn Web3 English with W3E"
                key="desc"
              />
              <link rel="icon" href="/icon.png" />
            </Head>
            {getLayout(<Component {...pageProps} />)}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </NextUIProvider>
  )
}

export default MyApp
