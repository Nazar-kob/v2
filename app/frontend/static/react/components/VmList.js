
import React, { useEffect, useMemo, useState } from 'react';

const VmList = () => {


	const [count , setCount] = useState(0);
	return (
		<>
			<span>React component</span>
			<button onClick={() => setCount(count + 1)}>Click me</button>
			<p>Count: {count}</p>
			<div>hello</div>
		</>
   )
}

export default VmList;
