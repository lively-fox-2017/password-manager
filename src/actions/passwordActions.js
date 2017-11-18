export const fetchPasswords = (passwords) => {
  return {
    type: 'FETCH_PASSWORDS',
    payload: { passwords }
  }
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
