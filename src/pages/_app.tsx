import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>DISCS COA MAKER</title>
        <meta
          name="description"
          content="Create Certificates of Authenticity for DISCS projects with ease."
        />
        <meta
          name="keywords"
          content="certificate of authenticity, COA, DISCS, ADMU, Ateneo, Ateneo de Manila, Ateneo de Manila University,"
        />
        <meta name="author" content="Jose Luis Bautista" />
        <meta
          property="og:title"
          content="Create Certificates of Authenticity for DISCS Projects with ease."
        />
        <meta
          property="og:description"
          content="Create Certificates of Authenticity for DISCS projects with ease."
        />
        <meta property="og:type" content="website" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
