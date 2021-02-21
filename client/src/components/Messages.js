import React, { Fragment, useEffect, useContext, useState } from 'react';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import BeginChat from '../assets/images/begin_chat.svg';
import MessageContext from '../context/message/messageContext';
import { Spinner, Form } from 'react-bootstrap';
import Message from './Message';

const Messages = () => {

  const messageContext = useContext(MessageContext);
  const [content, setContent] = useState('');  
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

  const SEND_MESSAGE = gql`
    mutation SendMessage($to: String!, $content: String!){
      sendMessage(to: $to, content: $content){
        from
        to
        content
        createdAt
      }
    }

  `;

  const [getMessages, { loading: messagesLoading, data: messagesData }] = useLazyQuery(GET_MESSAGES);

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onError: err => console.log(err)
  })

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
  }, [messagesData]);


  const submitMessage = (e) => {
    e.preventDefault();
    if(content.trim() === '') return;
    sendMessage({ variables: {to: selectedUser.username, content}});
    setContent('');
  }

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
          <img src={selectedUser.imageUrl || "https://www.gravatar.com/avatar/00000000000000000000000000000000"} alt="" className="userImage mr-3" />
          <h6 className="text-white">{selectedUser.username}</h6>
        </div>
        <div>
          <i className="closeIcon fa fa-times fa-2x text-white pointer" title="Close" onClick={() => setSelectedUser(null)}></i>
        </div>
      </div>
      <div className="messagesSection d-flex flex-column-reverse">
        {messages && messages.length > 0 ? (
          messages.map(message => (
            <Message key={message.uuid} message={message} />
          ))
        ) : (<p className="connected text-white fw-500">You are now connected!</p>)}
      </div>
    </div>
  }

  return (
    <Fragment>
      {selectedChatMarkup}
      { selectedUser &&
        <div className="m-3">
          <Form onSubmit={submitMessage}>
            <Form.Group className="d-flex ">
              <Form.Control type="text" className="py-3 shadow rounded-pill fw-500" placeholder="Send a new message..." value={content} onChange={(e) => setContent(e.target.value)}>
              </Form.Control>
              <i className="messageIcon position-absolute left-2 fa fa-paper-plane fa-2x text-primary" onClick={submitMessage}></i>
            </Form.Group>
          </Form>
        </div> }
    </Fragment>
  )
}

export default Messages;
