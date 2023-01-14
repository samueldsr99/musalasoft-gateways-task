"use client";
import queryClient from "@/lib/config/query-client";
import React from "react";
import { QueryClientProvider } from "react-query";

const ReactQueryWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default ReactQueryWrapper;
