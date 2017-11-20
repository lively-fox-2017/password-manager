const initState = {
    items : [],
    title : 'React Password Manager'
}

function rootReducer(state = initState, action) {
    switch(action.type) {
        case 'FETCH_DATA':
            return {...state, items: action.payload}
        case 'POST_DATA':
            return {...state, items: action.payload}
        case 'FETCH_ONE':
            return {...state, detail: action.payload}
        case 'EDIT_DATA':
            return {...state, detail: action.payload}
        case 'DEL_DATA':
            return {...state, items: action.payload}
        default: 
            return state
    }
}

export default rootReducer