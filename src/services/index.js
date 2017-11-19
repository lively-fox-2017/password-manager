import axios from 'axios'

const http = axios.create({baseURL: 'http://localhost:3003/accounts'})

export const accountsApi = () => {
  return http.get().then(({data}) => {
    return {data}
  }).catch(reason => {
    return {error: reason}
  })
}
