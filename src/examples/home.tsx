import React, { useState } from "react";

import Markdown from "../lib/markdown";
import * as T from "../lib/markdown/type";

export default () => {
  const [value, setValue] = useState<string>("");

  return (
    <>
      <h3 style={{ fontWeight: "lighter", color: "gray" }}>Default</h3>
      <Markdown value={value} onChange={(v) => setValue(v)} />
    </>
  );
};
