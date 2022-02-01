import { planetConstants } from "../constants";

const initialState = {
    list: []
}

export const planetReducer = (state = initialState, action) => {
    switch(action.type) {
        case planetConstants.SET_PLANET_LIST:
            return {
                ...state,
                list: action.data
            };
        case planetConstants.GET_PLANET_REQUEST_OUT:
            return {
                ...state,
                requestOut: true,
                error: undefined
            };
        case planetConstants.GET_PLANET_SUCCESS:
            return { ...state, error: undefined, requestOut: false };
        
        case planetConstants.GET_LANDING_FAIL:
            return { ...state, error: action.error, requestOut: false };
        default:
            return state;
    }
    
};