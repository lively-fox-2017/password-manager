import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:3000/'
})

export const getAllData = () => {
    return (dispatch) => {
        http.get('/passDb').then(({ data }) => {
            dispatch(getData(data))
        })
    }
}

export const postDataServer = (new_data_password) => {
    return (dispatch) => {
        http.post('/passDb', new_data_password).then(({ data }) => {
            dispatch(postData(data))
        })
    }
}

export const getSearchData = (searchVal) => {
    return (dispatch) => {
        http.get(`passDb?q=${searchVal}`).then(({ data }) => {
            dispatch(searchResult(data))
        })
    }
}

export const deleteData = (id) => {
    return (dispatch) => {
        http.delete(`passDb/${id}`).then(({ data }) => {
            dispatch(deleteDataReducer(id))
        })
    }
}

export const patchUpdateData = (new_data) => {
    return (dispatch) => {
        http.patch(`passDb/${new_data.id}`, new_data).then(({ data }) => {
            dispatch(updateDataStore(data))
        })
    }
}

export const getData = (data) => {
    return {
        type: 'GET_ALL_PASS',
        payload: { data }
    }
}

export const postData = (data) => {
    return {
        type: 'POST_PASS',
        payload: { data }
    }
}

export const searchResult = (data) => {
    return {
        type: 'SEARCH',
        payload: { data }
    }
}

export const deleteDataReducer = (id) => {
    return {
        type: 'DELETE_DATA',
        payload: { id }
    }
}

export const selectToEdit = (data) => {
    return {
        type: 'SELECT_TO_EDIT',
        payload: { data }
    }
}

export const updateDataStore = (data) => {
    return {
        type: 'UPDATE_DATA',
        payload: { data }
    }
}

export const destroyDataToEdit = () => {
    return {
        type: 'DESTROY_DATA_TO_EDIT'
    }
}

export const clearAllSearch = () => {
    return {
        type: 'CLEAR_ALL_SEARCH'
    }
}