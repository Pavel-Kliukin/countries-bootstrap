import { useEffect, useState } from 'react';
import classes from './CSS/Home.module.css';
import MovingFlags from './MovingFlags';
import { LinkContainer } from 'react-router-bootstrap';


const Home = () => {

  const [toggle, setToggle] = useState(false);

  const timer = setTimeout(() => {
    setToggle(prevToggle => !prevToggle);
  }, 2000)

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    }
  }, []);

  return (
    <div className={classes.homeBox}>
      <LinkContainer to="/countries">
        <div className={classes.titleBox}>
          < MovingFlags direction={true} toggle={toggle}/>
          <p className={classes.homeTitle}>Countries App</p>
          <p className={classes.homeMadeBy}>made by Pavel Kliukin</p>
          < MovingFlags direction={false} toggle={toggle}/>
        </div>
      </LinkContainer>
    </div>
  );
};

export default Home;
