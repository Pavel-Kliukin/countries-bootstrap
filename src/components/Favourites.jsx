import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../features/countries/countriesSlice";
import { clearFavourites } from "../features/countries/favouritesSlice";
import CountryCard from "./CountryCard";
import classes from './CSS/Countries.module.css';

const Favourites = () => {
  const dispatch = useDispatch()
  let countriesList = useSelector((state) => state.countries.countries)
  const loading = useSelector((state) => state.countries.loading)
  const [search, setSearch] = useState("")
  const favouritesList = useSelector((state) => state.favourites.favourites)  
  if (favouritesList !== null) {
      countriesList = countriesList.filter(c => favouritesList.includes(c.name.common))
  }
  else {
      countriesList = []
  }
  useEffect(() => {
      dispatch(initializeCountries())
  }, [dispatch])
  if (loading) {
      return (
        <Col className="text-center m-5">
          <Spinner
            animation="border"
            role="status"
            className="center"
            variant="info"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Col>
      )
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
            placeholder="Search for favourites"
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form>
      </Col>
    </Row>
    {/* <Row xs={2} md={3} lg={4} className=" g-3">
      <Button onClick={() => {
        dispatch(clearFavourites())
      }}>Clear Favourites</Button>
    </Row> */}
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
  )
}
export default Favourites;