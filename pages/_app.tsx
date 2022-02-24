import "../css/tailwind.css";
import "../css/prism.css";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { LayoutWrapper } from "../components/LayoutWrapper";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  );
}
