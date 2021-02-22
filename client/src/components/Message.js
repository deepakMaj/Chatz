import React, { useContext, Fragment, useState } from 'react';
import AuthContext from '../context/auth/authContext';
import classNames from 'classnames';
import { OverlayTrigger, Tooltip, Button, Popover } from 'react-bootstrap'; 
import moment from 'moment';
import { gql, useMutation } from '@apollo/client';

const Message = ({ message }) => {

  const REACT_TO_MESSAGE = gql`
    mutation ReactToMessage($uuid: String!, $content: String!){
      reactToMessage(uuid: $uuid, content: $content){
        uuid
      }
    }
  `;

  const reactions = ['❤️', '😆', '😯', '😢', '😡', '👍', '👎'];

  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const sent = message.from === user.username;
  const recieved = !sent;

  const messageReactions = [...new Set(message.reactions.map(reaction => reaction.content))];

  const [reactToMessage] = useMutation(REACT_TO_MESSAGE, {
    onError: err => console.log(err),
    onCompleted: data => {
      setShowPopover(false);
      console.log(data);
    }
  });

  const [showPopover, setShowPopover] = useState(false);

  const react = (reaction) => {
    reactToMessage({ variables: { uuid: message.uuid, content: reaction } });
  }

  const reactButton = 
    <OverlayTrigger
      trigger="click"
      placement="top"
      show={showPopover}
      onToggle={setShowPopover}
      transition={false}
      rootClose
      overlay={
        <Popover className="reactions rounded-pill">
          <Popover.Content className="d-flex px-0 py-3 align-items-center reactPopover">
            {reactions.map(reaction => (
              <Button variant="link" className="reactionBtn" key={reaction} onClick={() => react(reaction)}>
                {reaction}
              </Button>
            ))}
          </Popover.Content>
        </Popover>
      }
    >
      <Button variant="link" className="reactBtn px-2">
        <i className="far fa-smile"></i>
      </Button>
    </OverlayTrigger> 

  return (
    <Fragment>
      <div key={message.uuid} className={classNames("d-flex m-3", { "ml-auto": sent, "mr-auto": recieved })}>
        {sent && reactButton}
        <OverlayTrigger
          placement={sent ? "left" : "right"}
          overlay={
            <Tooltip>
              {moment(message.createdAt).format('MMMM DD, YYYY @ h:mm a')}
            </Tooltip>
          }
        >
          <div className={classNames("py-2 px-3 rounded-pill position-relative", { "bg-dark": sent, "bg-secondary": recieved })}>
            {message.reactions.length > 0 && (
              <div className={classNames("messageReaction rounded-pill py-1 px-2 fw-500 text-white", { "bg-dark": recieved, "bg-secondary": sent } )}>
                {messageReactions} {messageReactions.length}
              </div>
            )}
            <p className="text-white fw-500">{message.content}</p>
          </div>
        </OverlayTrigger>
        {recieved && reactButton}
      </div>
    </Fragment>
  )
}

export default Message;
