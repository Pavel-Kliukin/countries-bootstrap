import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { initializeCountries } from '../features/countries/countriesSlice';
import BackToTopButton from './BackToTopButton';
import classes from './CSS/Countries.module.css';
import CountryCard from './CountryCard';
import { auth } from "../auth/firebase"

const Countries = () => {
  const user = auth.currentUser
  const dispatch = useDispatch()
  const countriesList = useSelector((state) => state.countries.countries)
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(initializeCountries())
  }, [dispatch])

  return (
    <Container className={classes.cardsContainer} fluid>
      <Row xs={1} md={2} lg={3} className={classes.titleAndSearch}>
        <Col className="mt-5">
          <div className={classes.titleBox}>
            <h1>Countries</h1>
          </div>
        </Col>
        <Col className="mt-5 d-flex justify-content-center align-items-center">
          <Form>
            <Form.Control
              className={classes.searchForm}
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
            <Col className={`d-flex justify-content-center align-items-center ${classes.cardsCol}`} key={country.name.common}>
              <CountryCard country={country} user={user} />
            </Col>
          ]
          : prev,
          []
          )
        }
      </Row>
      <BackToTopButton />
    </Container>
  );
};

export default Countries;
