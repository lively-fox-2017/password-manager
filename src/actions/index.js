import axios from 'axios'

export const fetchData = () => {
    return (dispatch) => {
        axios.get('http://localhost:3000/data')
        .then(({data}) => {
            console.log(data, 'alskdmaskdsm')
            dispatch({
                type: 'FETCH_DATA',
                payload: data
            })
        })
    }
}

export const fetchOne = (id) => {
    return (dispatch) => {
        axios.get('http://localhost:3000/data/' + id)
        .then(({data}) => {
            console.log(data, 'get one')
            dispatch({
                type: 'FETCH_ONE',
                payload: data
            })
        })
    }
}

export const postData = (data) => {
    return (dispatch) => {
        axios.post('http://localhost:3000/data', data)
        .then(({data}) => {
            axios.get('http://localhost:3000/data')
            .then(({data}) => {
                dispatch({
                    type: 'POST_DATA',
                    payload: data
                })
            })
        })
    }
}

export const editData = (data,id) => {
    return (dispatch) => {
        axios.put('http://localhost:3000/data/' + id, data)
        .then(({data}) => {
            dispatch({
                type: 'EDIT_DATA',
                payload: data
            })
        })
    }
}

export const delData = (id) => {
    return (dispatch) => {
        axios.delete('http://localhost:3000/data/' + id)
        .then(({data}) => {
            axios.get('http://localhost:3000/data')
            .then(({data}) => {
                console.log(data, 'alskdmaskdsm')
                dispatch({
                    type: 'DEL_DATA',
                    payload: data
                })
            })
        })
    }
}