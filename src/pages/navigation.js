import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/header'

const Navigation = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Navigation