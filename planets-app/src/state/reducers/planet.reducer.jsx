import { planetConstants } from "../constants";

const initialState = {
  list: [],
  data: {
    label: "population",
    datasets: [],
  },
  chartTitle: "Population",
  error: undefined,
  requestOut: false,
  previous: null,
  next: null,
  pages: [],
  lastPage: "",
};

export const planetReducer = (state = initialState, action) => {
  switch (action.type) {
    case planetConstants.SET_PLANET_LIST:
      return {
        ...state,
        list: action.data,
      };

    case planetConstants.SET_BARCHART_DATA:
      return {
        ...state,
        data: {
          labels: action.barChartLabel,
          datasets: [
            {
              label: action.title,
              data: action.barChartData,
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        },
        chartTitle: action.title,
      };

    case planetConstants.GET_PLANET_REQUEST_OUT:
      return {
        ...state,
        requestOut: true,
        error: undefined,
      };

    case planetConstants.SET_PAGINATION:
      return {
        ...state,
        previous: action.data.prev,
        next: action.data.next,
        pages: action.data.pagesLink,
        lastPage: action.data.lastPage,
      };

    case planetConstants.GET_PLANET_SUCCESS:
      return { ...state, error: undefined, requestOut: false };

    case planetConstants.GET_PLANET_FAIL:
      return { ...state, error: action.error, requestOut: false };
      
    default:
      return state;
  }
};
