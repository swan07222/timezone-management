import { ADD_TIME, TIME_LOADING, GET_TIME , EDIT_TIME} from '../component/actions/types';

const initialState = {
    time: {},
    loading: false
};
    
export default function(state = initialState, action) {
    switch (action.type) {
        case TIME_LOADING:
            return {
                ...state,
                loading: true
            }

        case GET_TIME:
            return {
                ...state,
                time: action.payload,
                loading: false
            }
        case ADD_TIME:
            return {
                ...state,
                times: [action.payload, ...state.times]
            }
        case EDIT_TIME:
            return {
                ...state,
                times: [action.payload, ...state.times]
            }
        default:
            return state;
    }
}