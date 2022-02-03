import { planetService } from "../../services";
import { planetConstants } from "../constants";
import store from "../store";

export const getPlanetData = (url) => async (dispatch) => {
  dispatch({ type: planetConstants.GET_PLANET_REQUEST_OUT });
  planetService
    .getPlanetsList(url)
    .then((resp) => resp.json())
    .then((data) => {
      const barChartData = [];
      const barChartLabel = [];
      const results = data.results.map((element) => {
        return attributeStrtoNum(element);
      });

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
      const paginationLinks = [];
      let totalPages = Math.ceil(data.count / 10);
      let pageIndex = 1;
      // Creating all page links
      while (totalPages && pageIndex <= totalPages) {
        let pageUrl =
          "https://swapi.dev/api/planets/?page=" + pageIndex.toString();
        paginationLinks.push(pageUrl);
        pageIndex += 1;
      }

      dispatch({
        type: planetConstants.SET_PAGINATION,
        data: {
          next: data.next ? data.next : null,
          prev: data.previous ? data.previous : null,
          pagesLink: paginationLinks,
          lastPage:
            "https://swapi.dev/api/planets/?page=" + totalPages.toString(),
        },
      });

      dispatch({
        type: planetConstants.SET_PLANET_LIST,
        data: results,
      });

      let title = "POPULATION";
      // Create bar chart data
      // Default is set to population
      results.forEach((element) => {
        barChartData.push(element.population);
        barChartLabel.push(element.name);
      });
      dispatch({
        type: planetConstants.SET_BARCHART_DATA,
        barChartData,
        barChartLabel,
        title,
      });

      dispatch({ type: planetConstants.GET_PLANET_SUCCESS });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: planetConstants.GET_PLANET_FAIL, error });
    });
};

export const changeBarChartAttribute = (attribute) => async (dispatch) => {
  const barChartData = [];
  const barChartLabel = [];
  // create title for bar chart
  let title = attribute.replace(/_/g, " ").toUpperCase();
  const results = store.getState().planetReducer.list;
  results.forEach((element) => {
    barChartData.push(element[attribute]);
    barChartLabel.push(element.name);
  });
  dispatch({
    type: planetConstants.SET_BARCHART_DATA,
    barChartData,
    barChartLabel,
    title,
  });
};

/**
 * Convert all number string and change unknown to 0
 */
const attributeStrtoNum = (element) => {
  const parsedPop = parseInt(element.population);
  if (isNaN(parsedPop)) {
    element.population = 0;
  } else {
    element.population = parsedPop;
  }

  const parsedDia = parseInt(element.diameter);
  if (isNaN(parsedDia)) {
    element.diameter = 0;
  } else {
    element.diameter = parsedDia;
  }

  const parsedOrbit = parseInt(element.orbital_period);
  if (isNaN(parsedOrbit)) {
    element.orbital_period = 0;
  } else {
    element.orbital_period = parsedOrbit;
  }

  const parsedRotation = parseInt(element.rotation_period);
  if (isNaN(parsedRotation)) {
    element.rotation_period = 0;
  } else {
    element.rotation_period = parsedRotation;
  }

  const parsedWater = parseInt(element.surface_water);
  if (isNaN(parsedWater)) {
    element.surface_water = 0;
  } else {
    element.surface_water = parsedWater;
  }

  return element;
};
