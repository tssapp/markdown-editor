import React, { useState } from "react";

import { Markdown } from "../lib";

export default () => {
  const [value, setValue] = useState<string>("");

  return (
    <>
      <h3 style={{ fontWeight: "lighter", color: "gray" }}>Default</h3>
      <Markdown value={value} onChange={(v) => setValue(v)} />
    </>
  );
};
