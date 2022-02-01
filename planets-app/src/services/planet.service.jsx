/**
 * Add all services related to planets. 
 * This includes fetching all planet data and possibly changing planet data.
 */
const getPlanetsList = async () => {
    let url = 'https://swapi.dev/api/planets/?pages=1';
    const requestOptions = {
      method: 'GET',
    };

    return await fetch(url, requestOptions);
  }

  export const planetService = {
      getPlanetsList
  }