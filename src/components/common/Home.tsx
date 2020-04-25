import React from 'react'
import {NavLink} from 'react-router-dom'

function Home() {
    return (
        <NavLink to="/cats">Please click for this link</NavLink>
    )
}

export default Home;