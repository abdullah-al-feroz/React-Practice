import React, { forwardRef } from "react";

function Input({ type, placeholder }, ref) {
    return <input ref={ref} type={type} placeholder={placeholder} />;
}

const forwardInput = forwardRef(Input);

export default forwardInput;