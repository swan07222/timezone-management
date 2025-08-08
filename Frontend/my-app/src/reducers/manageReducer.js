import { ADD_USER, USER_LOADING, GET_USER , EDIT_USER } from '../component/actions/types';

const initialState = {
    user: [],
    loading: false
};
    
export default function(state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                loading: true
            }

        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case ADD_USER:
            return {
                ...state,
                users: [action.payload, ...state.users]
            }
        case EDIT_USER:
            return {
                ...state,
                users: [action.payload, ...state.users]
            }
        default:
            return state;
    }
}