import React, { Fragment, useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Spinner } from 'react-bootstrap';
import MessageContext from '../context/message/messageContext';
import classNames from 'classnames';

const Users = ({ searchValue }) => {

  const messageContext = useContext(MessageContext);
  let { users, setUsers, setSelectedUser } = messageContext;
  const selectedUser = users?.find(user => user.selected === true);

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

  if(searchValue){
    users = users.filter(user => {
      if (user.username.toLowerCase().includes(searchValue) || user.username.toUpperCase().includes(searchValue) || user.username.includes(searchValue))
        return user;
    });
  }

  let loader
  const { loading } = useQuery(GET_USERS, {
    onCompleted: data => setUsers(data.getUsers),
    onError: err => console.log(err)
  });
  if (!users || loading) {
    loader = <Spinner animation="grow" />;
  }
  else if (!users && !loading) {
    loader = <h6 className="text-white text-center mt-5 fw-500">No users have joined</h6>
  }
  else if(users.length === 0){
    loader = <h6 className="text-white text-center mt-5 fw-500">No users found.</h6>
  }
  else {
    loader = users.map(user => {
      let username;
      if(selectedUser){
        username = selectedUser.username;
      }
      return (<div key={user.username} className={classNames("d-flex align-items-center p-3 contentBorder contact", {"userBg": username === user.username})} onClick={() => setSelectedUser(user)}>
        <div className="mr-3">
          <img src={user.imageUrl || "https://www.gravatar.com/avatar/00000000000000000000000000000000"} alt="" className="userImage" />
        </div>
        <div>
          <h6 className="text-white mb-1">{user.username}</h6>
          <p className="latestMessage text-secondary fw-500">{user.latestMessage ? user.latestMessage.content : "You are now connected"}</p>
        </div>
      </div>
    )});
  }
  
  return (
    <Fragment>
      <div className="usersSection">
        {loader}
      </div>
    </Fragment>
  )
}

export default Users;
