export const fetchPasswords = (passwords) => {
  return {
    type: 'FETCH_PASSWORDS',
    payload: { passwords }
  };
};

export const fetchSearches = (searches) => {
  return {
    type: 'FETCH_SEARCHES',
    payload: { searches }
  };
};

export const requestPasswords = () => {
  return (dispatch) => {
    window
      .$server
      .get('/passwords')
      .then(({ data }) => {
        dispatch(fetchPasswords(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const createPassword = (newPassword, callback) => {
  newPassword.created_at = new Date().toISOString();
  newPassword.updated_at = null;

  return (dispatch, getState) => {
    window
      .$server
      .post('/passwords', newPassword)
      .then(({ data }) => {
        const passwords = getState().passwordReducer.passwords;

        passwords.push(data);

        dispatch(fetchPasswords(passwords));

        callback();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updatePasswordById = (id, newPasswordInfo, callback) => {
  return (dispatch, getState) => {
    window
      .$server
      .put('/passwords/' + id, newPasswordInfo)
      .then(({ data }) => {
        data.updated_at = new Date().toISOString();
        const passwords = getState()
                          .passwordReducer
                          .passwords
                          .map((password) => {
                            if (password.id === id) {
                              password = data;
                            }
                            return password;
                          });

        dispatch(fetchPasswords(passwords));

        callback();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deletePasswordById = (id, callback) => {
  return (dispatch, getState) => {
    window
      .$server
      .delete('/passwords/' + id)
      .then(({ data }) => {
        const passwords = getState()
                          .passwordReducer
                          .passwords
                          .filter((password) => {
                            return password.id !== id;
                          });

        dispatch(fetchPasswords(passwords));

        callback();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
