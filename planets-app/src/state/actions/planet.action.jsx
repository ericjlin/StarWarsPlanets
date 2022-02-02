import { planetService } from "../../services";
import { planetConstants } from "../constants";

export const getPlanetData = (url) => async dispatch => {
    dispatch({ type: planetConstants.GET_PLANET_REQUEST_OUT });
    planetService
        .getPlanetsList(url)
        .then(resp => resp.json())
        .then(data => {
            const barChartData = [];
            const barChartLabel = [];
            const results = data.results;
            
            results.sort((first, second) => {
                if (first.name < second.name) {
                    return -1;
                }
                if (first.name > second.name) {
                    return 1;
                }
                return 0;
            });

            // Total pages depends on the amount of data present on each page
            // Will need to change if number of items per page is updated
            const paginationLinks = []
            let totalPages = Math.ceil(data.count / 10);
            let pageIndex = 1;
            // Creating all page links
            while (totalPages && pageIndex <= totalPages) {
                let pageUrl = 'https://swapi.dev/api/planets/?page=' + pageIndex.toString();
                paginationLinks.push(pageUrl);
                pageIndex += 1
            }

            dispatch({
                type: planetConstants.SET_PAGINATION,
                data: {
                    next: data.next ? data.next : null,
                    prev: data.previous ? data.previous : null,
                    pagesLink: paginationLinks,
                    lastPage: 'https://swapi.dev/api/planets/?page=' + totalPages.toString()
                }
            });

            dispatch({
                type: planetConstants.SET_PLANET_LIST,
                data: results
            });

            // Create bar chart data
            // Check for outlier
            results.forEach(element => {
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