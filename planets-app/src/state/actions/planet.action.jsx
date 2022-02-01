import { planetService } from "../../services";
import { planetConstants } from "../constants";

export const getPlanetData = (page) => async dispatch => {
    dispatch({ type: planetConstants.GET_PLANET_REQUEST_OUT });

    planetService.getPlanetsList()
        .then(resp => resp.json())
        .then(data => {
            const barChartData = [];
            const barChartLabel = [];

            dispatch({
                type: planetConstants.SET_PLANET_LIST,
                data: data.results
            });

            dispatch({
                type: planetConstants.SET_PAGINATION,
                data: {
                    next: data.next ? data.next : null,
                    prev: data.previous ? data.previous : null
                }
            });

            // Create bar chart data
            // Check for outlier
            data.results.forEach(element => {
                const parsed = parseInt(element.population)
                if (isNaN(parsed)) {
                    barChartData.push(0);
                } else {
                    barChartData.push(parsed);
                }
                barChartLabel.push(element.name);
            });

            dispatch( { type: planetConstants.SET_BARCHART_POPULATION, barChartData, barChartLabel } )
            dispatch({ type: planetConstants.GET_PLANET_SUCCESS });
        })
        .catch(error => {
            console.log(error);
            dispatch({ type: planetConstants.GET_PLANET_FAIL, error });
        })
};