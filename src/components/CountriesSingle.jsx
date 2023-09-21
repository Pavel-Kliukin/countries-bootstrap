import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import { useLocation,useNavigate } from 'react-router-dom';
import classes from './CSS/CountriesSingle.module.css'

const CountriesSingle = () => {
  // Function hooks
  const location = useLocation()
  const navigate = useNavigate() // force Browser to go to a particular link

  // State hooks
  const [weather, setWeather] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  //Destructuring variables
  const country = location.state.country

  useEffect(()=> {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`)
      .catch((err) => {
        setError(true)
      })
      .then((res) => {
        setWeather(res.data)
        setLoading(false)
      })
  }, [country.capital])

  console.log("weather", weather);


  return (
    <Container className={classes.countryContainer}>
      <div className={classes.countryBox}>
        <div className={classes.countryNameBox}>
          <h2>{country.name.common}</h2>
          <h4 className={classes.officialName}>{country.name.official}</h4>
        </div>
        <div className={classes.countryInfoBox}>
          <div className={classes.flagBox}>
            <Card.Img className={classes.flagIMG} src={country.flags.png} /> 
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CountriesSingle;
