import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { loginWithEmailAndPassword } from "../auth/firebase"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import classes from './CSS/Login.module.css'


const Login = ({user}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/countries')
  },[user, navigate])

  return (
    <div className={classes.loginBox}>
      <div className={classes.formBox}>
        <h1>Login:</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button 
          onClick={() => loginWithEmailAndPassword(email, password)} 
          style={{ marginLeft: '10px' }}>Login
        </Button>
        <div>
          Don't have an account?{` `}
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  )



}

export default Login