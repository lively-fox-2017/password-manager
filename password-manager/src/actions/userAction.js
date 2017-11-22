
export const getUserData = (data) => {
  console.log('dapet datanya dari action ------> 2 ', data)
  return {
    type: 'DATA_GETUSER',
    payload: {
      usersData: data
    }
  }
}
