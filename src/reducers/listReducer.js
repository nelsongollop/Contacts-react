const ListReducer = (state = {
    list: [],
    filtered: [],
    update: undefined,
    selectedIndex: null,
    selected: null}, action) => {

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
                filtered,
                selectedIndex: null
            }
            break;
        case "SET_UPDATE":
            state = {
                ...state,
                update: action.payload
            }
            break;
        case "SET_SELECTED":
            state = {
                ...state,
                selectedIndex: action.payload,
                selected: action.payload != null ? state.filtered[action.payload] : {}
            }
            break;
        case "SET_CONTACTS":
            state = {
                ...state,
                list: action.payload,
                filtered: action.payload
            }
            break;
        default:
            return state

    }
    return state
};

export default ListReducer