export const ADD_PLAYER_NAME = 'ADD_PLAYER_NAME';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';

const receiveToken = (token) => ({ type: RECEIVE_TOKEN, token });

export function requestAPI() {
  return async (dispatch) => {
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await request.json();
    localStorage.setItem('token', token);
    dispatch(receiveToken(token));
  };
}

export const saveNamePlayer = (name) => ({
  type: ADD_PLAYER_NAME,
  payload: { name },
});