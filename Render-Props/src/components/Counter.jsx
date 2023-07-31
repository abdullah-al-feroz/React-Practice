import React, { useState } from 'react';

const Counter = (props) => {
    const { children } = props;
    debugger
        const [count, setCount] = useState(0);

        const incrementCount = () => {
            setCount(count + 1);
        };
        return children(count, incrementCount);
};
export default Counter;