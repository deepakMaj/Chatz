import { React } from 'react';
import chat from '../assets/images/chat.svg';
import logo from '../assets/images/logo.svg';
import { Row, Col, Container } from 'react-bootstrap';
import Register from './Register';
import Login from './Login';
import { Route, Switch } from 'react-router-dom';

const Main = () => {
    return (
      <Container className="position-relative">
        <div className="heading py-4 position-relative">
          <div className="d-flex justify-content-center align-items-center">
            <h1 className="heading text-white text-center">Welcome to Chatz</h1>
            <img src={logo} alt="" className="logoImage ml-3" />
          </div>
        </div>
        <div className="authContainer mt-0">
          <Row>
            <Col className="imageCol d-md-none d-sm-none d-lg-block d-xl-block d-xxl-block">
              <div className="imgContainer position-relative">
                <img src={chat} alt="" className="image" />
              </div>
            </Col>
            <Col>
              <Switch>
                <Route exact path="/register" component={Register}></Route>
                <Route exact path="/login" component={Login}></Route>
              </Switch>
            </Col>
          </Row>
        </div>
        <div className="pb-2">
          <div>
            <p className="text-center text-muted">Chatz &copy; 2021</p>
          </div>
        </div> 
      </Container>
    )
}

export default Main;
