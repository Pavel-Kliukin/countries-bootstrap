import { useEffect, useState } from 'react';
import classes from './CSS/Home.module.css';
import MovingFlags from './MovingFlags';
import { LinkContainer } from 'react-router-bootstrap';


const Home = () => {

  const [toggle, setToggle] = useState(false);

  const duration = toggle ? 0 : 2000;

  const timer = setTimeout(() => {
    setToggle(prevToggle => !prevToggle);
  }, duration)

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    }
  }, [timer]);

  return (
    <div className={classes.homeBox}>
      <LinkContainer to="/countries">
        <div className={classes.titleBox}>
          < MovingFlags direction={true} toggle={toggle}/>
          <p className={classes.homeTitle}>Countries App</p>
          <div className={classes.underline} ></div> 
          <p className={classes.homeMadeBy}>made by Pavel Kliukin</p>
          < MovingFlags direction={false} toggle={toggle}/>
        </div>
      </LinkContainer>
    </div>
  );
};

export default Home;
