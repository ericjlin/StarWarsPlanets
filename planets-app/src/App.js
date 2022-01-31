import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

const getPlanetsList = async () => {
  const requestOptions = {
    method: 'GET',
  };
  return await fetch('https://swapi.dev/api/planets/?pages=1', requestOptions)
  .then((response) => {
    response.json()
  })
}

const App = () => {
  const [planetList, setPlanetList] = useState([]);
  useEffect(() => {
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        Star Wars Planet
      </header>
      <body>
        {
          planetList.map((planet) => {
            return(
              <div>
                {planet.name}
              </div>
            );
          })
          
        }
      </body>
    </div>
  );
}

export default App;
