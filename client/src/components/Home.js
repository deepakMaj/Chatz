import React, { Fragment, useContext } from 'react';
import { Row, Button } from 'react-bootstrap';
import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext';
import Users from './Users';
import Messages from './Messages';

const Home = ({ history }) => {

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { user, logout } = authContext;

  const accountLogout = () => {
    logout();
    alertContext.setAlert("You have logged out successfully");
    history.push('/login');
  } 

  return (
    <Fragment>
      <Row className="row homeRow">
        <div className="infoCol">
          <div className="contactSection d-flex flex-column">
            <div className="displayInfo d-flex justify-content-between align-items-center p-3">
              <div className="d-flex align-items-center">
                <img src={user.imageUrl || "https://www.gravatar.com/avatar/00000000000000000000000000000000"} alt="" className="userImage mr-3"/>
                <h6 className="text-white">{user.username}</h6>
              </div>
              <div>
                <Button onClick={accountLogout} className="btn btn-primary logoutBtn">Logout</Button>
              </div>
            </div>
            <div>
              <div className="searchBar d-flex position-relative p-3">
                <i id="searchIcon" className="fa fa-search position-absolute"></i>
                <input type="text" className="searchInput"/>
              </div>
            </div>
            <Users />
          </div>
        </div>

        <div className="messageCol">
          <Messages />
        </div>
      </Row>
    </Fragment>
  )
}

export default Home;
