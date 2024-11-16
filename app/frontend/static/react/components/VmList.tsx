import React, { useEffect, useMemo, useState } from "react";

const VmList = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="flex gap-4 flex-row">
      <span className="text-lg">React component</span>
      Click me
      <p>Count: {count}</p>
      <div>hello</div>
    </div>
  );
};

export default VmList;
