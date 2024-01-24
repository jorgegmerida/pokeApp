import "@/styles/globals.css";
import { Header } from "@/ui/header";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Header />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
