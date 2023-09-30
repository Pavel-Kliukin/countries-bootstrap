import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import CountryCard from './CountryCard';
import countriesAPI from '../services/countries';
import { initializeCountries } from '../features/countries/countriesSlice';
import classes from './CSS/Countries.module.css';

const Countries = () => {
  const dispatch = useDispatch()
  const countriesList = useSelector((state) => state.countries.countries)
  const loading = useSelector((state) => state.countries.isLoading)
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(initializeCountries())
  }, [dispatch])

  return (
    <Container className={classes.cardsContainer} fluid>
      <Row>
        <Col className="mt-5 d-flex justify-content-center">
          <Form>
            <Form.Control
              style={{ width: '18rem' }}
              type="search"
              placeholder="Search for countries"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className={`g-3 ${classes.cardsRow}`}>
        {

        countriesList.reduce( (prev, country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase()) ? 
          [...prev, 
            <Col className="d-flex justify-content-center align-items-center" key={country.name.common}>
              <CountryCard country={country} />
            </Col>
          ]
          : prev,
          []
          )
        }
      </Row>
    </Container>
  );
};

export default Countries;
