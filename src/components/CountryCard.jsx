import { Card, Col, ListGroup, Row } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import classes from './CSS/CountryCard.module.css'
import { useDispatch, useSelector } from "react-redux"


const CountryCard = ({country}) => {

  const favouritesList = useSelector((state) => state.favourites.favourites)
  const dispatch = useDispatch()

  return (
    <Col className={`mt-5 ${classes.cardCol}`}>
      <LinkContainer m={0}
        to={`/countries/${country.name.common}`} // creates a link to a particular country with a country name
        state={{ country: country }}
      >
        <Card m={0} className={`h-100 ${classes.cardBox}`}>
          <Card.Body className="d-flex flex-column">
            <Card.Title>{country.name.common}</Card.Title>
           

            <Card.Subtitle className="mb-5 text-muted">
              {country.name.official}
            </Card.Subtitle>
            <div className={classes.flagContainer}>
              <div className={classes.flagBox}>
                <Card.Img className={classes.flagIMG} src={country.flags.png} /> 
              </div>
            </div>
            <Card.Subtitle className="mb-2 text-muted">Population: {country.population.toLocaleString()} people</Card.Subtitle>
          </Card.Body>
        </Card>
      </LinkContainer>
    </Col>
  )
}

export default CountryCard