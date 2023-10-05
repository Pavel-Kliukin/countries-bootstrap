import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../features/countries/countriesSlice";
import { clearFavourites } from "../features/countries/favouritesSlice";
import CountryCard from "./CountryCard";
import classes from './CSS/Favourites.module.css';
import BackToTopButton from "./BackToTopButton";
import { getFavouritesFromSource } from "../auth/firebase";

const Favourites = () => {

  const dispatch = useDispatch()
  let countriesList = useSelector((state) => state.countries.countries)
  const countriesLoading = useSelector((state) => state.countries.loading)
  const favouritesLoading = useSelector((state) => state.favourites.isLoading) 
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
      dispatch(getFavouritesFromSource())
  }, [dispatch])
  
  if (countriesLoading || favouritesLoading) {
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
      <Row xs={1} md={2} lg={3} className={classes.clearAndSearch}>
        <Col className="mt-5">
            <div className={classes.titleBox}>
              <h1>My Favourites</h1>
            </div>
          </Col>
        <Col className="mt-5 d-flex justify-content-center align-items-center">
          <Form>
            <Form.Control
              type="search"
              className={classes.searchForm}
              placeholder="Search for favourites"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
        <Col className="mt-5 d-flex justify-content-center align-items-center">
          <div className={classes.buttonBox}>
            <Button onClick={() => {
              dispatch(clearFavourites())
            }}>Clear Favourites</Button>
          </div>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className={`g-3 ${classes.cardsRow}`}>
        {
          countriesList.reduce( (prev, country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase()) ? 
            [...prev, 
              <Col className={`d-flex justify-content-center align-items-center ${classes.cardsCol}`} key={country.name.common}>
                <CountryCard country={country} />
              </Col>
            ]
            : prev,
            []
            )
        }
      </Row>
      <BackToTopButton />
    </Container>
  )
}
export default Favourites;