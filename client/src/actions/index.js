import * as firebase from 'firebase'
// import * as actionTypes from './actionsType';
// import Axios from 'axios';

// const apiUrl = 'https://newsapi.org/v1/articles?source=abc-news-au&sortBy=top&apiKey=080e457774e54e00b8fd9315ed37c24d';


export const getUserSuccess = (value) => {
  return {
    type: 'GET_USER',
    value
  }
};

export const addUser = (adduser) => {

  return (dispatch) => {
    return firebase.database().ref('passwordmanager/user').push(adduser);
  };
};

export const getUser = (getuser) => {

  return (dispatch) => {
    return firebase.database().ref().child('passwordmanager/user').on('value', snap => {
      // console.log(snap.val().key)
      let objek = []
      for (var i in snap.val()) {
        objek.push({
          id: i,
          url: snap.val()[i].url,
          username: snap.val()[i].username,
          password: snap.val()[i].password
        })
      }
      dispatch(getUserSuccess(objek))
    })
  };
};
