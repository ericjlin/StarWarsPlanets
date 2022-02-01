import { planetConstants } from "../constants";

const initialState = {
    list: [],
    data: {
        label: "population",
        datasets: []
    },
    error: undefined,
    requestOut: false,
    previous: null,
    next: null
}

export const planetReducer = (state = initialState, action) => {
    switch(action.type) {
        case planetConstants.SET_PLANET_LIST:
            return {
                ...state,
                list: action.data
            };
        case planetConstants.SET_BARCHART_POPULATION:
            return {
                ...state,
                data: {
                    labels: action.barChartLabel,
                    datasets: [{
                        label: "population",
                        data: action.barChartData
                    }]
                }
            }
        case planetConstants.GET_PLANET_REQUEST_OUT:
            return {
                ...state,
                requestOut: true,
                error: undefined
            };
        case planetConstants.SET_PAGINATION:
            return {
                ...state,
                previous: action.data.prev,
                next: action.data.next   
            }
        case planetConstants.GET_PLANET_SUCCESS:
            return { ...state, error: undefined, requestOut: false };
        
        case planetConstants.GET_LANDING_FAIL:
            return { ...state, error: action.error, requestOut: false };
        default:
            return state;
    }
    
};