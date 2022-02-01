import { planetService } from "../../services";
import { planetConstants } from "../constants";

export const getPlanetData = () => dispatch => {
    dispatch({ type: planetConstants.GET_PLANET_REQUEST_OUT });

    planetService.getPlanetsList()
        .then(resp => resp.json())
        .then(data => {
            dispatch({
                type: planetConstants.SET_PLANET_LIST,
                data: data.results
            })
            dispatch({ type: planetConstants.GET_PLANET_SUCCESS });
        })
        .catch(error => {
            console.log(error);
            dispatch({ type: planetConstants.GET_PLANET_FAIL, error });
        })
};