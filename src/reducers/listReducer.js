const ListReducer = (state = {list: [], filtered: [], update: undefined}, action) => {
    switch (action.type) {
        case "GET_CONTACTS_FULFILLED":
            state = {
                ...state,
                list: action.payload,
                filtered: action.payload
            };
            break;
        case "FILTER_LIST":
            let filtered = state.list.filter(obj => Object.keys(obj).some(key =>
                String(obj[key]).toLowerCase().includes(action.payload.toLowerCase())));
            state = {
                ...state,
                filtered
            }
            break;
        case "ADD_CONTACT":
            state = {
                ...state,
                list: [...state.list, action.payload]
            }
            break;
        case "SET_UPDATE":
            state = {
                ...state,
                update: action.payload
            }
            break;
        default:
            break;

    }
    return state
};

export default ListReducer