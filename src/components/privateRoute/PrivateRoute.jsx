import { Navigate } from 'react-router-dom'


export default function PrivateRoute({component: Component, ...rest}) {
  const token = localStorage.getItem('token')

  return token ? <Component {...rest} /> : <Navigate to='/login' />
}