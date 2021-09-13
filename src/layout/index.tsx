import React from "react";

import Header from "./header";

const Layout = ({ children }: { children: any }) => (
  <div>
    <Header />

    <main className="flex-grow">
      <div className="container mx-auto px-4 py-4">{children} </div>
    </main>
  </div>
);

export default Layout;
