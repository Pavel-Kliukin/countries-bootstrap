import { useState } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { loginWithEmailAndPassword } from "../auth/firebase"
import { Link } from "react-router-dom"

function ModalLogin (props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Favourites
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 style={{ textAlign: 'center', margin: '1rem 0 2rem 0' }}>
          <p>To manage your favourites, please login:</p>
        </h5>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)} 
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => loginWithEmailAndPassword(email, password)}>Login</Button>
      </Modal.Footer>
      <div style={{ textAlign: 'left', margin: '1rem 1rem'}}>
          Don't have an account?{` `}
          <Link to="/register">Register</Link>
      </div>
    </Modal>
  );
}

export default ModalLogin;