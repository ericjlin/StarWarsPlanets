/**
 * Add all services related to planets.
 * This includes fetching all planet data and possibly changing planet data.
 */
const getPlanetsList = async (inputUrl) => {
  let url = "https://swapi.dev/api/planets/";
  if (
    inputUrl &&
    inputUrl !== null &&
    inputUrl !== undefined &&
    url.length > 0
  ) {
    url = inputUrl;
  }
  const requestOptions = {
    method: "GET",
  };

  return await fetch(url, requestOptions);
};

export const planetService = {
  getPlanetsList,
};
