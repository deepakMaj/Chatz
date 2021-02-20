import React, { Fragment, useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Spinner } from 'react-bootstrap';
import MessageContext from '../context/message/messageContext';
import classNames from 'classnames';

const Users = ({ setSelectedUser, selectedUser }) => {

  const messageContext = useContext(MessageContext);
  const { users, setUsers } = messageContext;

  const GET_USERS = gql`
    query GetUsers{
      getUsers{
        username
        imageUrl
        createdAt
        latestMessage {
          content
        }
      }
    }
  `;

  let loader;
  const { loading } = useQuery(GET_USERS, {
    onCompleted: data => setUsers(data.getUsers),
    onError: err => console.log(err)
  });
  if (!users || loading) {
    loader = <Spinner animation="grow" />;
  }
  else if (!users && !loading) {
    loader = <h6 className="text-white">No users have joined</h6>
  }
  else {
    loader = users.map(user => {
      let username;
      if(selectedUser){
        username = selectedUser.username;
      }
      return (<div key={user.username} className={classNames("d-flex align-items-center p-3 contentBorder contact", {"displayInfo": username === user.username})} onClick={() => setSelectedUser(user)}>
        <div className="mr-3">
          <img src={user.imageUrl} alt="" className="userImage" />
        </div>
        <div>
          <h6 className="text-white mb-1">{user.username}</h6>
          <p className="text-secondary fw-500">{user.latestMessage ? user.latestMessage.content : "You are now connected"}</p>
        </div>
      </div>
    )});
  }

  return (
    <Fragment>
      <div>
        {loader}
      </div>
    </Fragment>
  )
}

export default Users;
