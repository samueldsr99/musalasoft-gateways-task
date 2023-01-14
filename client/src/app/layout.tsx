import React from "react";

import Navbar from "@/components/navbar";
import ReactQueryWrapper from "./react-query-wrapper";

import "@/styles/globals.css";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html>
      <head />
      <body>
        <ReactQueryWrapper>
          <header>
            <Navbar />
          </header>
          <main className="container mx-auto max-w-7xl">{children}</main>
        </ReactQueryWrapper>
      </body>
    </html>
  );
};

export default Layout;
