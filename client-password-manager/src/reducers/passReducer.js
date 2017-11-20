const passState = {
    data_password: [],
    searchPass: [],
    editPass: []
}

const PasswordReducer = (state = passState, action) =>{
    switch (action.type) {
        case 'GET_ALL_PASS':
            return { ...state, data_password: action.payload.data }
        case 'POST_PASS':
            if (state.data_password.length > 0) {
                const newData = state.data_password.concat(action.payload.data)
                return { ...state, data_password: newData }
            } else {
                return state
            }
        case 'SEARCH':
            return { ...state, searchPass: action.payload.data }
        case 'DELETE_DATA':
            var after_deleted_data = state.data_password.filter(password => password.id !== action.payload.id)
            return { ...state, data_password: after_deleted_data }
        case 'SELECT_TO_EDIT':
            return { ...state, editPass: action.payload.data }
        case 'UPDATE_DATA':
            const newData = state.data_password.map(pass => {
                if (pass.id === action.payload.data.id) {
                    return { ...pass, ...action.payload.data }
                }
                return pass
            })
            // console.log(newData)
            return { ...state, data_password: newData }
        case 'DESTROY_DATA_TO_EDIT':
            return { ...state, editPass: [] }
        case 'CLEAR_ALL_SEARCH':
            return { ...state, searchPass: [] }
        default:
            return state
    }
}

export default PasswordReducer