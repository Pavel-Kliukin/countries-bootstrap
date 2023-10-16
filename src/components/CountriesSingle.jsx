import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Card, Spinner, Col, Image, Row, Button } from 'react-bootstrap';
import { useLocation,useNavigate } from 'react-router-dom';
import classes from './CSS/CountriesSingle.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { addFavourite, removeFavourite } from '../features/countries/favouritesSlice';
import CountryMap from './CountryMap';

const CountriesSingle = () => {

  // Function hooks
  const location = useLocation()
  const navigate = useNavigate() // force Browser to go to a particular link

  // State hooks
  const [weather, setWeather] = useState('')
  const [errors, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  //Destructuring variables
  const country = location.state.country

  // For favourites
  const favouritesList = useSelector((state) => state.favourites.favourites)
  const dispatch = useDispatch()

  const handleRemoveFavourite = (event) => {
    event.stopPropagation();
    dispatch(removeFavourite(country.name.common));
  };

  const handleAddFavourite = (event) => {
    event.stopPropagation();
    dispatch(addFavourite(country.name.common));
  };

  useEffect(()=> {

    if(!country.capital) {
      setLoading(false)
      setError(true)
    } else {

      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`)
        .catch((err) => {
          setError(true)
          setLoading(false)
        })
        .then((res) => {
          setWeather(res.data)
          setLoading(false)
        })
    }

  }, [country.capital])

  //Defines the initial zoom (scale) for Google Map depending on the country area
  let zoom = 12
  const area = parseInt(country.area)
  if (150 < area && area < 750) {
    zoom = 11
  } else if (750 <= area && area < 5000) {
    zoom = 10
  } else if (5000 <= area && area < 10000) {
    zoom = 9
  } else if (10000 <= area && area < 100000) {
    zoom = 8
  } else if (100000 <= area && area < 270000) {
    zoom = 7
  } else if (270000 <= area && area < 1550000) {
    zoom = 6
  } else if (1550000 <= area && area < 7670000) {
    zoom = 5
  } else if (7670000 <= area && area < 10000000) {
    zoom = 4
  } else if (1000000 <= area) {
    zoom = 3
  }
  
  console.log("area", area);
  console.log("zoom initial", zoom);


  if (loading) {
    return (
      <Container>
        <Spinner animation="border" role="status" className='center' variant='info'>
          {/* This span is not visible for a user but we use it for accessability porpose */}
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    )

  }
      

  return (
    <Container className={classes.countryContainer}>
      <div className={classes.countryBox}>
        <div className={classes.countryNameBox}>
          <h2>
            {country.name.common}
          </h2>
        </div>
        <Row sm={1} md={2} className='mt-5'>
          <Col className={classes.flagCol}>
            <div className={classes.flagBox}>
              <Card.Img className={classes.flagIMG} src={country.flags.png} /> 
            </div>
            <div className={classes.heartBox}>
              {favouritesList.includes(country.name.common) ? (
                <i
                className="bi bi-heart-fill text-danger m-1 p-1"
                onClick={handleRemoveFavourite} />
              ) : (
                <i
                className="bi bi-heart text-danger m-1 p-1"
                onClick={handleAddFavourite} />
              )}
            </div>
          </Col>
          <Col className={classes.secondColInRow}>
            <div className={classes.countryInfoBox}>
              <p><strong>Official name:</strong> {country.name.official}</p>
              {country.capital && <p><strong>Capital:</strong> {country.capital}</p>}
              {errors && <p>Sorry, we don't have weather data for this country</p>}
              {!errors && weather && (
                <div className={classes.weatherBox}>
                    <div className={classes.weatherIconBox}>
                      <img id={classes.weatherIcon} src={'http://openweathermap.org/img/w/' + weather.weather[0].icon + '.png'} alt="weather icon" />
                    </div>
                    <p>
                      Right now it is <strong>{parseInt(weather.main.temp)}</strong> degrees in {country.capital} and {weather.weather[0].description}
                    </p>
                </div>
              )}
            </div>
          </Col>
        </Row>
        <Row sm={1} md={2} className='mt-5'>
          <Col>
            <Image className={classes.capitalImg} thumbnail src={'https://source.unsplash.com/1600x900/?' + country.name.common} />
          </Col>
          <Col className={classes.secondColInRow}>
            <div className={`${classes.countryInfoBox} ${classes.bigInfo}`}>
              <p><strong>Region:</strong> {country.region}&nbsp;&nbsp; /&nbsp;&nbsp; <strong>Subregion:</strong> {country.subregion}</p>
              <p><strong>Population:</strong> {country.population.toLocaleString('en-US')} people</p>
              <p><strong>Area:</strong> {country.area.toLocaleString('en-US')} km<sup>2</sup></p>
              <p><strong>Timezone:</strong> {country.timezones[0]}</p>
              <p><strong>Currency: </strong> 
                {Object.values(country.currencies ?? {})
                  .map((currency) => currency.name)
                  .join(", ")}</p>
              <p><strong>Languages:</strong> {Object.values(country.languages ?? {}).join(", ")}</p>
            </div>
          </Col>
        </Row>
        <Row className='mt-5'>
          <Col>
            <CountryMap className={classes.map} lat={country.latlng[0]} lng={country.latlng[1]} zoom={zoom}/>
          </Col>
        </Row>
        <Row className='mt-5'>
          <Col>
            <Button varian="light" onClick={() => navigate('/countries')}>Back to Countries</Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default CountriesSingle;
