import axios from 'axios';

const credentialsUrl = 'http://localhost:3001/credentials';

export const setCredentials = (credentials) => ({
  'type': 'SET_CREDENTIALS',
  'payload': { credentials }
});

export const getCredentials = () => {
  return (dispatch, getState) => {
    axios.get(credentialsUrl)
    .then(resp => {
      dispatch(setCredentials(resp.data));
    })
    .catch(err => {
      console.log(err);
    });
  }
};

export const saveCredential = (credential) => {
  return (dispatch, getState) => {
    axios.post(credentialsUrl, credential)
    .then(resp => {
      dispatch(getCredentials());
    })
    .catch(err => {
      console.log(err);
    });
  }
};

export const destroyCredential = (id) => {
  return (dispatch, getState) => {
    axios.delete(credentialsUrl + `/${id}`)
    .then(resp => {
      dispatch(getCredentials());
    })
    .catch(err => {
      console.log(err);
    });
  }
}

export const editCredential = (id, credential) => {
  return (dispatch, getState) => {
    axios.put(credentialsUrl + `/${id}`, credential)
    .then(resp => {
      dispatch(getCredentials());
    })
    .catch(err => {
      console.log(err);
    });
  }
}