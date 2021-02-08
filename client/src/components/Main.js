import { React, Fragment } from 'react';
import chat from '../assets/images/chat.svg';
import logo from '../assets/images/logo.svg';
import { Row, Col } from 'react-bootstrap';
import Register from './Register';

const Main = () => {
    return (
      <Fragment>
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
              <Register />
            </Col>
          </Row>
        </div>
        <div className="pt-4">
          <div>
            <p className="text-center text-muted">Chatz &copy; 2021</p>
          </div>
        </div> 
      </Fragment>
    )
}

export default Main;
