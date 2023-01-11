import React from "react";

import Navbar from "@/components/navbar";

import "@/styles/globals.css";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html>
      <head />
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default Layout;
