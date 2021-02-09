import { React, Fragment } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <Fragment>
      <Card className="authCard px-4 py-2">
        <h2 className="text-center pb-2 text-dark">Login</h2>
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <div className="text-center mt-4">
            <Button variant="dark" size="sm" block type="submit">
              Login
						</Button>
          </div>

          <div className="text-center mt-4">
            <p className="text-dark">New to Chatz? <Link to="/register" className="text-primary">Register</Link></p>
          </div>
        </Form>
      </Card>
    </Fragment>
  )
}

export default Login;
