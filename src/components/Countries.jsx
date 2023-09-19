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

  // We will be replacing this with data from our API.
  const country = {
    name: {
      common: 'Example Country'
    }
  }

  return (
    <Container className={classes.cardsContainer} fluid>
      <Row>
        <Col className="mt-5 d-flex justify-content-center">
          <Form>
            <Form.Control
              style={{ width: '18rem' }}
              type="search"
              className="me-2 "
              placeholder="Search for countries"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
      <Row xs={2} md={3} lg={3} className={`g-3 ${classes.cardsRow}`}>
        {
        countriesList.map((country) => {
          //This is a search filter
          if (country.name.common.toLowerCase().includes(search.toLowerCase()) 
              || country.name.official.toLowerCase().includes(search.toLowerCase())){
            return (
              <Col className="d-flex justify-content-center align-items-center" key={country.name.common}>
                <CountryCard country={country} />
              </Col>
            )
          } else return null
        })}
      </Row>
    </Container>
  );
};

export default Countries;
