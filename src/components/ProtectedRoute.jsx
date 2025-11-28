import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function ProtectedRoute({ children, adminOnly = false }){
    const { user } = useAuth()
    if(!user){ return <Navigate to="/login" replace /> }
    if(adminOnly && user.rol !== 'ROLE_ADMIN') return <Navigate to="/" replace />
    return children
}