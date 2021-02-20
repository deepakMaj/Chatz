import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Row, Button } from 'react-bootstrap';
import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext';
import { gql, useLazyQuery } from '@apollo/client';
import BeginChat from '../assets/images/begin_chat.svg';
import Users from './Users';

const Home = ({ history }) => {

  const GET_MESSAGES = gql`    
    query GetMessages($from: String!){
      getMessages(from: $from){
        uuid
        from
        to
        content
        createdAt
      }
    }
  `;

  const [selectedUser, setSelectedUser] = useState(null);
  const [getMessages, { loading: messagesLoading, data: messagesData}] = useLazyQuery(GET_MESSAGES);

  useEffect(() => {
    if(selectedUser){
      getMessages({variables: { from: selectedUser.username}})
    }
  }, [selectedUser]);

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
              <div>
                {/* <img src={} alt="" className="userImage"/> */}
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
            <Users setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
          </div>
        </div>

        <div className="messageCol">
          {selectedUser === null ? 
          (<div className="messageBox d-flex justify-content-center align-items-center">
            <img src={BeginChat} alt="" className="chatImg" />
          </div>) : (
            <div className="contactBox">
              <div className="navbar d-flex justify-content-between align-items-center p-3">
                <div className="d-flex align-items-center">
                  <img src={selectedUser.imageUrl} alt="" className="userImage mr-3" />
                  <h6 className="text-white">{selectedUser.username}</h6>
                </div>
                <div>
                  <i className="closeIcon fa fa-times fa-2x text-white pointer" title="Close" onClick={() => setSelectedUser(null)}></i>
                </div>
              </div>
              {messagesData && messagesData.getMessages.length > 0 ? (
                messagesData.getMessages.map(message => (
                  <div key={message.uuid} className="text-white fw-500">{message.content}</div>
                ))
              ): (<p className="text-white fw-500">You are now connected!</p>)}
            </div>
          )}
        </div>
      </Row>
    </Fragment>
  )
}

export default Home;
