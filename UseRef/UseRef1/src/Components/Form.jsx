import React, { useEffect, useRef } from 'react'

const Form = () => {
    const inputRef = useRef(null);

    useEffect(() => {
        console.log(inputRef.current);   // catch dom element
        inputRef.current.focus()  // focus dom element
    }, [])
    return (
        <div>
            <p>
                <input ref={inputRef} type='text' placeholder='enter something' />
            </p>
        </div>
    )
}

export default Form