import { useEffect, useState } from 'react';
import classes from './CSS/BackToTopButton.module.css'

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setShowButton(scrollPosition > 200);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      {showButton && (
        <button className={classes.backToTopButton} onClick={scrollToTop}>
          <i className="bi-arrow-up"></i>
        </button>
      )}
    </>
  );
};

export default BackToTopButton;