import { SET_USERS, SET_USER_MESSAGES, SET_SELECTED_USER, ADD_MESSAGE, ADD_MESSAGE_REACTION } from '../types';

const MessageReducer = (state, action) => {
  let usersCopy, userIndex;
  const { username, message, messages, reaction } = action.payload;
  switch(action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload
      }
    case SET_USER_MESSAGES:
      usersCopy = [...state.users];
      userIndex = usersCopy.findIndex(u => u.username === username);
      usersCopy[userIndex] = { ...usersCopy[userIndex], messages }; 
      return {
        ...state,
        users: usersCopy
      }
    case SET_SELECTED_USER:
      usersCopy = state.users.map(user => ({
        ...user,
        selected: user.username === action.payload
      }));
      return {
        ...state,
        users: usersCopy
      }
    case ADD_MESSAGE:
      usersCopy = [...state.users];
      userIndex = usersCopy.findIndex(u => u.username === username);
      message.reactions = [];
      let newUser = {
        ...usersCopy[userIndex],
        messages: usersCopy[userIndex].messages ? [message, ...usersCopy[userIndex].messages] : null,
        latestMessage: message
      }
      usersCopy[userIndex] = newUser;
      return {
        ...state,
        users: usersCopy
      }
    case ADD_MESSAGE_REACTION:
      usersCopy = [...state.users];
      userIndex = usersCopy.findIndex(u => u.username === username);
      let userCopy = {...usersCopy[userIndex]};
      const messageIndex = userCopy.messages?.findIndex(m => m.uuid === reaction.message.uuid);
      if(messageIndex > -1){
        let messagesCopy = [...userCopy.messages];
        let reactionsCopy = [...messagesCopy[messageIndex].reactions];  
        const reactionIndex = reactionsCopy?.findIndex(r => r.uuid === reaction.uuid);
        if(reactionIndex > -1){
          reactionsCopy[reactionIndex] = reaction;
        } else{
          reactionsCopy = [...reactionsCopy, reaction];      
        }
        messagesCopy[messageIndex] = {
          ...messagesCopy[messageIndex],
          reactions: reactionsCopy
        };
        userCopy = {
          ...userCopy,
          messages: messagesCopy
        }
        usersCopy[userIndex] = userCopy;
      }
      return {
        ...state,
        users: usersCopy
      }
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

export default MessageReducer;