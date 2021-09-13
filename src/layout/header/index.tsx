// taken from https://tailwindui.com/components/application-ui/navigation/navbars
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { menus, linksApp, links } from "../../links";

const navigation = menus.map((menu) => {
  return { name: menu.name, href: menu.link, current: false };
});

export default function Example() {
  const [current, setCurrent] = useState(linksApp.home.link);

  return (
    <header>
      Prosemirror MD Editor
      <span style={{ float: "right" }}>
        <Link to="/" style={{ paddingRight: "10px" }}>
          Default
        </Link>
        <Link to="/custom">Custom</Link>
      </span>
    </header>
  );
}
