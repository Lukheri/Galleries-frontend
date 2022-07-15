import React, { useState } from 'react'

import Home from '../Home/Home'
import Navbar from '../Navbar/Navbar'

export default function Gallery() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  return (
    <div>
        <Navbar 
            user={user}
            setUser={setUser}
        />
        <Home />
    </div>
  )
}
