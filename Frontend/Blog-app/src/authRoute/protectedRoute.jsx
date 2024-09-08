import React from 'react'
import { Navigate ,Outlet} from 'react-router-dom'


export default function ProtectedRoute() {
    const isLoggedin=window.localStorage.getItem('token')

    return isLoggedin ? <Outlet/> : <Navigate to={'/login'} />
}
