import React from 'react'

const Child = ( {handleClick} ) => {
console.log("HandleClick", handleClick)
    const employee = {
        id: 1,
        name: 'Mehedi',
        mail: 'mehedi@gmail.com',
        designation: 'Software Engineer'
    }

    const onHandleClick = () => {
        handleClick(employee)
    }

    return (
        <div>
            <button
            onClick={() => {
                onHandleClick()
            }}
            >
                Click
            </button>
        </div>
    )
}
export default Child
