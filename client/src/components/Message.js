import React, { useContext, Fragment } from 'react';
import AuthContext from '../context/auth/authContext';
import classNames from 'classnames';
import { OverlayTrigger, Tooltip } from 'react-bootstrap'; 
import moment from 'moment';

const Message = ({ message }) => {

  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const sent = message.from === user.username;
  const recieved = !sent;

  return (
    <Fragment>
      <OverlayTrigger
        placement={sent ? "left" : "right"}
        overlay={
          <Tooltip>
            {moment(message.createdAt).format('MMMM DD, YYYY @ h:mm a')}
          </Tooltip>
        }
      >
        <div key={message.uuid} className={classNames("d-flex m-3", { "ml-auto": sent, "mr-auto": recieved })}>
          <div className={classNames("py-2 px-3 rounded-pill", { "bg-dark": sent, "bg-secondary": recieved })}>
            <p className="text-white fw-500">{message.content}</p>
          </div>
        </div>
      </OverlayTrigger>
    </Fragment>
  )
}

export default Message;
