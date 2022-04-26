import { Navigate } from 'react-router-dom'
import { ReactChild } from 'react'
interface AuxProps {
  children: ReactChild
}
function AuthComponent({ children }: AuxProps) {
  const token = sessionStorage.getItem('token')
  if (token) {
    return <>{children}</>
  } else {
    return <Navigate to="/login" replace />
  }
}

export default AuthComponent
