import React from 'react'
import {Navigate ,Outlet} from 'react-router-dom'

export default function AuthRoute() {

    let Auth=window.localStorage.getItem('token')
  return <>
  {
         !Auth ?   <Outlet /> : <Navigate to="/dashboard" /> 
  }
  </>
}