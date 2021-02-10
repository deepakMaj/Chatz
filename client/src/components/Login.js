import { React, Fragment, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLazyQuery, gql } from '@apollo/client';

const Login = (props) => {

  const LOGIN_USER = gql`
    query login($username: String!, $password: String!){
      login(username: $username, password: $password){
        id
        username
        email
        token
        createdAt
      }
    }
  `;

  const [variables, setVariables] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  // loginUser is a query function
  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
    onCompleted: (data) => {
      localStorage.setItem('token', data.login.token);
      props.history.push('/');
    }
  });

  const submitLoginForm = (e) => {
    e.preventDefault();
    loginUser({ variables });
    setVariables({
      username: '',
      password: ''
    });
  }

  return (
    <Fragment>
      <Card className="authCard px-4 py-2">
        <h2 className="text-center pb-2 text-dark">Login</h2>
        <Form onSubmit={submitLoginForm}>
          <Form.Group>
            <Form.Label className={errors.username && 'text-danger'}>
              {errors.username ?? 'Username'}
            </Form.Label>
            <Form.Control type="text" className={errors.username && 'is-invalid'} placeholder="Enter username" value={variables.username} onChange={e => setVariables({ ...variables, username: e.target.value })} />
          </Form.Group>

          <Form.Group>
            <Form.Label className={errors.password && 'text-danger'}>
              {errors.password ?? 'Password'}
            </Form.Label>
            <Form.Control type="password" className={errors.password && 'is-invalid'} placeholder="Password" value={variables.password} onChange={e => setVariables({ ...variables, password: e.target.value })} />
          </Form.Group>

          <div className="text-center mt-4">
            <Button variant="dark" size="sm" block type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Login'}
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
