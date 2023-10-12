import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import classes from './CSS/MovingFlags.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { initializeCountries } from '../features/countries/countriesSlice';


const MovingFlags = () => {

  const dispatch = useDispatch()
  const countriesList = useSelector((state) => state.countries.countries)
  const country = countriesList[2]

  useEffect(() => {
      if (countriesList.length === 0) {
        dispatch(initializeCountries())
    } 
  }, [])

  
  return (
    <>
    {!country ? <div className={classes.loading}>Loading...</div> : 
          <div className={classes.flagsContainer}>
            <div className={classes.flagBox}>
              <Card.Img className={classes.flagIMG} src={country.flags.png} /> 
            </div>         
          </div>
        }
    </>
  );
};

export default MovingFlags;