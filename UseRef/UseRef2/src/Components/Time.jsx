import React, { useEffect, useRef, useState } from 'react'

const Time = () => {
    const [date, setDate] = useState(new Date());
    const intervalRef = useRef();

    const tick = () => {
        setDate(new Date());
    }

    useEffect(() => {
        intervalRef.current = setInterval(tick, 1000);
        //do the cleanup -stop the timer
        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <div>
            <p>Time: {date.toLocaleTimeString()}</p>
            <p>
                <button type='button' onClick={() => clearInterval(intervalRef.current)}>
                    Cleanup
                </button>
            </p>
        </div>
    )
}

export default Time