import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import classes from './CSS/MovingFlags.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { initializeCountries } from '../features/countries/countriesSlice';


const MovingFlags = ({direction, toggle}) => { // direction is a boolean. True = right, False = left

  const dispatch = useDispatch()
  const countriesList = useSelector((state) => state.countries.countries)

  useEffect(() => {
    if (countriesList.length === 0) {
      dispatch(initializeCountries())
    } 
  }, [dispatch, countriesList.length])
  
  const country = countriesList[Math.floor(Math.random() * countriesList.length)]
  
  return (
    <>
    {!country ? <div className={classes.loading}>Loading...</div> : 
      <>
        {toggle ? 
          <div></div> 
          :
          <div className={classes.flagsContainer}>
            {direction ? 

              <div className={`${classes.flagBox} ${classes.moveRight}`}>
                <Card.Img className={classes.flagIMG} src={country.flags.png} /> 
              </div> :    
              <div>

                <div className={`${classes.flagBox} ${classes.moveLeft}`}>
                  <Card.Img className={classes.flagIMG} src={country.flags.png} /> 
                </div>        

              </div>  
            }
          </div>
        }
      </>
        }
    </>
  );
};

export default MovingFlags;