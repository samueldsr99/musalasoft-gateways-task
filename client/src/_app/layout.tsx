import React from "react";

import Navbar from "@/components/navbar";
import ReactQueryWrapper from "./react-query-wrapper";

import "@/styles/globals.css";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800;900&family=Roboto+Mono:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
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
