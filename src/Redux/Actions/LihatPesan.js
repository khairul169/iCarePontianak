import {UserAPI, MessageAPI} from 'public/API';

const setUserId = payload => ({type: 'MESSAGE_USER_ID', payload});
const setUser = payload => ({type: 'MESSAGE_USER', payload});
const setMessages = payload => ({type: 'MESSAGE_SET_MESSAGES', payload});

export const fetchMessage = id => async (dispatch, getState) => {
  const stateUserId = getState().lihatPesan.userId;
  const userId = id || stateUserId;

  if (!userId) {
    return;
  }

  // clear data
  if (userId !== stateUserId) {
    dispatch(setUser(null));
    dispatch(setMessages([]));
  }

  dispatch(setUserId(userId));

  try {
    // fetch user
    const user = await UserAPI.getUserById(userId);

    if (!user.success) {
      return;
    }

    // fetch messages
    const messages = await MessageAPI.getMessages(userId);

    if (!messages.success) {
      return;
    }

    // set state
    dispatch(setUser(user.result));
    dispatch(setMessages(messages.result));
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = message => async (dispatch, getState) => {
  const userId = getState().lihatPesan.userId;

  if (!userId) {
    return;
  }

  try {
    await MessageAPI.create(userId, message);
    dispatch(fetchMessage());
  } catch (error) {
    console.log(error);
  }
};
