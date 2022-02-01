import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from 'chart.js/auto'
import { useDispatch, useSelector } from "react-redux";
import { getPlanetData } from './state/actions';
import { Container, Row, Col, Table } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem';
import { Bar } from 'react-chartjs-2';

const App = () => {
  const dispatch = useDispatch();
  const planetList = useSelector( state => state.planetReducer.list);
  const isLoading = useSelector(state => state.planetReducer.requestOut);
  const barChartData = useSelector(state => state.planetReducer.data);
  const next = useSelector(state => state.planetReducer.next);
  const prev = useSelector(state => state.planetReducer.previous);

  useEffect(() => {
    dispatch(getPlanetData(''));
  }, [dispatch]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Star Wars Population',
      },
    },
  };

  return (
  <Container>
    <Row className='justify-content-center'>Star Wars Planet</Row>
    { isLoading ? (
        <Row className='justify-content-center'>Loading...</Row>) : (
        <React.Fragment>
          <Row className='justify-content-center' style={{
            bottom: 10
          }}>
         {barChartData ? <Bar options={options} data={barChartData}/> : <Row></Row>}
          </Row>
          <Row className='justify-content-center'>
            <Table striped bordered hover>
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
        </React.Fragment>)
        }
        <Pagination className="justify-content-center">
          <Pagination.First onClick={() => {
            // dispatch(getPlanetData(1));
          }} />
          { prev ?
          <Pagination.Prev onClick={() => {
            dispatch(getPlanetData(prev));
          }}/> : <Pagination.Prev disabled/>
          }
          <Pagination.Ellipsis />
          { next ?
          <Pagination.Next onClick={() => {
            dispatch(getPlanetData(next));
          }}/> : <Pagination.Next disabled/>}
          <Pagination.Last />
        </Pagination>
  </Container>
  )
};

export default App;
