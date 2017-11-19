function usernameValue(username) {
  return { type: 'SET_USERNAME', state: { username } };
}

function passwordValue(password) {
  return { type: 'SET_PASSWORD', state: { password } };
}

function urlValue(url) {
  return {type: 'SET_URL', state: { url }};
}

function populateToEdit(username, password, url) {
  return {type: 'POPULATE_TO_EDIT', state: {password, username, url}}
}

function clearAll() {
  return {
    type: 'CLEAR_ALL',
    state: {
      username: '',
      password: '',
      url: '',
    },
  }
}

export default {
  usernameValue,
  passwordValue,
  urlValue,
  clearAll,
  populateToEdit,
}
