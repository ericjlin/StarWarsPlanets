import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlanetData } from './state/actions';

const App = () => {
  const dispatch = useDispatch();
  const planetList = useSelector( state => state.planetReducer.list);
  const isLoading = useSelector(state => state.planetReducer.requestOut);
  useEffect(() => {
    dispatch(getPlanetData());
  }, [dispatch]);

 
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
        { isLoading ? (
        <div>Loading...</div>): (
        <div> 
          {planetList.map((planet) => {
          return <div key={"index_" + planet.name}>{planet.name}</div>;
        })}
        </div>)
        }
      </header>
    </div>
  );
};

export default App;
