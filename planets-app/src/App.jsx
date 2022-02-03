import "./App.css";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { getPlanetData } from "./state/actions";
import { Container, Row, Table } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";
import { Bar } from "react-chartjs-2";
import PlanetNavbar from "./components/PlanetNavbar";

const App = () => {
  const dispatch = useDispatch();
  const planetList = useSelector((state) => state.planetReducer.list);
  const barChartData = useSelector((state) => state.planetReducer.data);
  const title = useSelector((state) => state.planetReducer.chartTitle);
  const next = useSelector((state) => state.planetReducer.next);
  const prev = useSelector((state) => state.planetReducer.previous);
  const pages = useSelector((state) => state.planetReducer.pages);
  const last = useSelector((state) => state.planetReducer.lastPage);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
        type: "logarithmic",
      },
    },
  };

  useEffect(() => {
    dispatch(getPlanetData(""));
  }, [dispatch]);

  return (
    <React.Fragment>
      <PlanetNavbar />
      <Container>
        <br />
        <Row className="justify-content-center">
          <Bar options={options} data={barChartData} />
        </Row>
        <br />
        <Row className="justify-content-center">
          <Table striped bordered hover size="md" responsive>
            <tr>
              <th>Name</th>
              <th>Population</th>
              <th>Rotation Period</th>
              <th>Orbital Period</th>
              <th>Diameter</th>
              <th>Climate</th>
              <th>Surface Water</th>
            </tr>
            <tbody>
              {planetList.map((planet) => {
                return (
                  <tr key={"index_" + planet.name}>
                    <td>{planet.name}</td>
                    <td>{planet.population}</td>
                    <td>{planet.rotation_period}</td>
                    <td>{planet.orbital_period}</td>
                    <td>{planet.diameter}</td>
                    <td>{planet.climate}</td>
                    <td>{planet.surface_water}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>

        {/* Futher improvements can include scaling pagination to handle large number of pages */}
        <Pagination className="justify-content-center">
          <Pagination.First
            onClick={() => {
              dispatch(getPlanetData(""));
            }}
          />
          {prev ? (
            <Pagination.Prev
              onClick={() => {
                dispatch(getPlanetData(prev));
              }}
            />
          ) : (
            <Pagination.Prev disabled />
          )}
          {pages.map((link, index) => {
            return (
              <Pagination.Item
                onClick={() => {
                  dispatch(getPlanetData(link));
                }}
              >
                {index + 1}
              </Pagination.Item>
            );
          })}
          {next ? (
            <Pagination.Next
              onClick={() => {
                dispatch(getPlanetData(next));
              }}
            />
          ) : (
            <Pagination.Next disabled />
          )}
          <Pagination.Last
            onClick={() => {
              dispatch(getPlanetData(last));
            }}
          />
        </Pagination>
      </Container>
    </React.Fragment>
  );
};

export default App;
