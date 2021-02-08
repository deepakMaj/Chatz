import { React, Fragment } from 'react';

const Login = () => {
  return (
    <Fargment>
      <Card className="authCard px-4 py-4">
        <h2 className="text-center pb-2 text-dark">Register</h2>
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <div className="text-center">
            <Button variant="dark" size="sm" block type="submit">
              Login
						</Button>
          </div>
        </Form>
      </Card>
    </Fargment>
  )
}

export default Login;
