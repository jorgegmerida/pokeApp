import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

// import { QueryClient, QueryClientProvider } from "react-query";
// import "../styles/globals.css";
// import type { AppProps } from "next/app";
// import { Header } from "../src/components/Header/Header";

// function MyApp({ Component, pageProps }: AppProps) {
//   const queryClient = new QueryClient();
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Header />
//       <Component {...pageProps} />
//     </QueryClientProvider>
//   );
// }

// export default MyApp;
