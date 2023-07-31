import React, { useEffect, useState } from 'react'

const ViewUserInfo = () => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('dataKey'));
    if (items) {
      setItems(items);
    }
  }, []);

  return (
    <div>
      fsdfsdfdf
    </div>
  )
}

export default ViewUserInfo
