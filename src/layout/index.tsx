import React, { useState } from "react";

import Footer from "./footer";
import Header from "./header";

function Layout({ children }: { children: any }) {
  const [showBanner, setBanner] = useState(false);

  const toggleBanner = () => setBanner(!showBanner);

  return (
    <div>
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-4">{children} </div>
      </main>
    </div>
  );
}
export default Layout;
