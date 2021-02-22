import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Row, Button } from 'react-bootstrap';
import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext';
import MessageContext from '../context/message/messageContext';
import Users from './Users';
import Messages from './Messages';
import { useSubscription, gql } from '@apollo/client';

const Home = ({ history }) => {

  const NEW_MESSAGE = gql`
    subscription NewMessage {
      newMessage {
        uuid
        from 
        to
        content
        createdAt
      }
    }
  `;

  const NEW_REACTION = gql`
    subscription NewReaction {
      newReaction {
        uuid
        content
        createdAt
        message {
          uuid
          to
          from
        }
      }
    }
  `;

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const messageContext = useContext(MessageContext);

  const [searchValue, setSearchValue] = useState('');

  const { data: messageData, error: messageError } = useSubscription(NEW_MESSAGE);

  const { data: reactionData, error: reactionError } = useSubscription(NEW_REACTION);

  const { user, logout } = authContext;
  const { sendUserMessage, addMessageReaction } = messageContext;

  useEffect(() => {
    if(messageError) console.log(messageError);
    if(messageData) {
      const message = messageData.newMessage;
      const otherUser = user.username === message.to ? message.from : message.to;
      sendUserMessage({ username: otherUser, message });
    }
  }, [messageError, messageData]);

  useEffect(() => {
    if (reactionError) console.log(reactionError);
    if (reactionData) {
      const reaction = reactionData.newReaction;
      const otherUser = user.username === reaction.message.to ? reaction.message.from : reaction.message.to;
      addMessageReaction({ username: otherUser, reaction });
    }
  }, [reactionError, reactionData]);

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
                <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} className="searchInput"/>
              </div>
            </div>
            <Users searchValue={searchValue} />
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
