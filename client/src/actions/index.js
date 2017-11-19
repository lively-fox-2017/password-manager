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

export const getUserOneSuccess = (value) => {
  return {
    type: 'GET_ONE_USER',
    value
  }
};

export const knophandle = (value) => {
  return {
    type: 'GET_KNOP',
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
          password: snap.val()[i].password,
          createat: snap.val()[i].createat,
          editedat: snap.val()[i].editedat
        })
      }
      dispatch(getUserSuccess(objek))
    })
  };
};

export const getUserSatuan = (id) => {
  return (dispatch) => {
    return firebase.database().ref().child('passwordmanager/user').child(id).on('value', snap => {
      let objek = {
        id: snap.key,
        url: snap.val().url,
        username: snap.val().username,
        password: snap.val().password,
        createat: snap.val().createat,
        editedat: snap.val().editedat
      }
      dispatch(getUserOneSuccess(objek))
    })
  };
};

export const editUser = (data) => {

  console.log('ini gokil', data.username)
  return (dispatch) => {
    return firebase.database().ref('passwordmanager/user/' + data.id).set({
      username: data.username,
      password: data.password,
      editedat: data.editedat,
      createat: data.createat,
      url: data.url
    });
  }
}

export const hapususer = (id) => {
  return (dispatch) => {
    return firebase.database().ref('passwordmanager/user/' + id).remove();
  };
};

export const knop = (parameter) => {
  return (dispatch) => {
    parameter = !parameter
    console.log('actions', parameter)
    return dispatch(knophandle(parameter))
  }
}
