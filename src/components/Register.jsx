import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerWithEmailAndPassword } from '../auth/firebase'
import { Button } from 'react-bootstrap'
import classes from './CSS/Register.module.css'

const Register = ({user}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const register = () => {
    if(!name) {
      alert('Please enter your name!')
    }
    registerWithEmailAndPassword(name, email, password)
  }

  useEffect(() => {
    if (user) navigate('/countries')
  },[user, navigate])

  return (
    <div className={classes.loginBox}>
      <div className={classes.formBox}>
        <h1>Register:</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
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
        <Button onClick={register}>Register</Button>
        <div>
          Already have an account?{` `}
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Register;