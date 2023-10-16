import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = ({user, children}) => {
  if (!user) {
    console.log('user is not logged in');
    return <Navigate to="/login"/>
  }
  return <Outlet />
}

export default ProtectedRoute