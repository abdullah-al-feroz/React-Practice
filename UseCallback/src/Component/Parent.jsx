import React, { useState } from 'react'
import Child from './Child'

const Parent = () => {
    const [employee, setEmployee] = useState({
        id: 0,
        name: '',
        mail: '',
        designation: ''
    })

    const handleClick = (event) => {
        setEmployee({ ...employee, ...event })
    }

    return (
        <div>
            <Child handleClick={handleClick} />
            <h2> Employee Id: {employee.id}  </h2>
            <h2> Employee Name: {employee.name} </h2>
            <h2> Employee Mail: {employee.mail}  </h2>
            <h2> Designation: {employee.designation}  </h2>
        </div>
    )
}

export default Parent
