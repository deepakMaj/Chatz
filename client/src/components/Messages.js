import React, { Fragment, useEffect, useContext } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import BeginChat from '../assets/images/begin_chat.svg';
import MessageContext from '../context/message/messageContext';
import { Spinner } from 'react-bootstrap';

const Messages = () => {

  const messageContext = useContext(MessageContext);
  const { users, setSelectedUser, setUserMessages } = messageContext;
  const selectedUser = users?.find(user => user.selected === true);
  const messages = selectedUser?.messages;

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

  const [getMessages, { loading: messagesLoading, data: messagesData }] = useLazyQuery(GET_MESSAGES);

  useEffect(() => {
    if (selectedUser && !selectedUser.messages) {
      getMessages({ variables: { from: selectedUser.username } })
    }
  }, [getMessages, selectedUser]);

  useEffect(() => {
    if(messagesData && selectedUser !== undefined) {
      setUserMessages({
        username: selectedUser.username,
        messages: messagesData.getMessages
      });
    }
  }, [messagesData, setUserMessages, selectedUser]);

  let selectedChatMarkup;
  if(!messages && !messagesLoading){
    selectedChatMarkup = <div className="messageBox d-flex justify-content-center align-items-center">
      <img src={BeginChat} alt="" className="chatImg" />
    </div>
  }
  else if(messagesLoading){
    selectedChatMarkup = <Spinner animation="grow" />
  }
  else{
    selectedChatMarkup = <div className="contactBox">
      <div className="navbar d-flex justify-content-between align-items-center p-3">
        <div className="d-flex align-items-center">
          <img src={selectedUser.imageUrl} alt="" className="userImage mr-3" />
          <h6 className="text-white">{selectedUser.username}</h6>
        </div>
        <div>
          <i className="closeIcon fa fa-times fa-2x text-white pointer" title="Close" onClick={() => setSelectedUser(null)}></i>
        </div>
      </div>
      {messages && messages.length > 0 ? (
        messages.map(message => (
          <div key={message.uuid} className="text-white fw-500">{message.content}</div>
        ))
      ) : (<p className="text-white fw-500">You are now connected!</p>)}
    </div>
  }

  return (
    <Fragment>
      {selectedChatMarkup}
    </Fragment>
  )
}

export default Messages;
