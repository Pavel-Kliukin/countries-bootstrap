import React from 'react';
import classes from './CSS/Home.module.css';

const Home = () => {
  return (
    <div className={classes.homeBox}>
      <div className={classes.titleBox}>
        <p className={classes.homeTitle}>Countries App</p>
        <p className={classes.homeMadeBy}>made by Pavel Kliukin</p>
      </div>
    </div>
  );
};

export default Home;
