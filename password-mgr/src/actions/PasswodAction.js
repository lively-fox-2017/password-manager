import axios from 'axios'

export const loadPasswordJSON = (passwordlist)=>{
  return {
    type : 'GetPasswordJSON',
    payload : {
      passwordlist
    }
  }
}

export const fetchpasswordlist = () =>{
  return(dispatch)=> {
    axios.get("http://localhost:3004/passmgrs")
    .then(({data})=>{
      return dispatch(loadPasswordJSON(data.))
    }).catch(err=>{
      
    })
  }
}
