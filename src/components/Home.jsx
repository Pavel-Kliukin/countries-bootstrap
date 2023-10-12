import classes from './CSS/Home.module.css';
import MovingFlags from './MovingFlags';


const Home = () => {



  return (
    <div className={classes.homeBox}>
      <div className={classes.titleBox}>
        <p className={classes.homeTitle}>Countries App</p>
        <p className={classes.homeMadeBy}>made by Pavel Kliukin</p>
        < MovingFlags />
      </div>
    </div>
  );
};

export default Home;
