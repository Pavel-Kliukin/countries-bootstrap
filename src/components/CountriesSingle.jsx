import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Card, Spinner, Col, Image, Row, Button } from 'react-bootstrap';
import { useLocation,useNavigate } from 'react-router-dom';
import classes from './CSS/CountriesSingle.module.css'

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



  useEffect(()=> {

    if(!country.capital) {
      setLoading(false)
      setError(true)
    } else {

      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`)
        .catch((err) => {
          setError(true)
        })
        .then((res) => {
          setWeather(res.data)
          setLoading(false)
        })
    }

  }, [country.capital])

  console.log("weather", weather);

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
          <h2>{country.name.common}</h2>
          {/* <h4 className={classes.officialName}>{country.name.official}</h4> */}
        </div>
        <div className={classes.countryInfoBox}>
          <div className={classes.flagBox}>
            <Card.Img className={classes.flagIMG} src={country.flags.png} /> 
          </div>
        </div>
        <Row className='mt-5'>
          <Col>
            <Image thumbnail src={'https://source.unsplash.com/1600x900/?' + country.capital} />
          </Col>
          <Col>
          {errors && <p>Sorry, we don't have weather data for this country</p>}
            {!errors && weather && (
              <div>
                <p>
                  Right now it is <strong>{parseInt(weather.main.temp)}</strong> degrees in {country.capital} and {weather.weather[0].description}
                </p>
                <img src={'http://openweathermap.org/img/w/' + weather.weather[0].icon + '.png'} alt="weather icon" />
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Button varian="light" onClick={() => navigate('/countries')}>Back to Countries</Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default CountriesSingle;
