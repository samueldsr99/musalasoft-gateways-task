import { QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";

import "@/styles/globals.css";
import queryClient from "@/lib/config/query-client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
