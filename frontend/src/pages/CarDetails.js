import React from 'react'

import { Link, useLocation } from 'react-router-dom';

import {
  faCar,
  faGlobe,
  faNoteSticky,
  faDriversLicense,
  faDollar,
  faCalendarAlt,
  faHandshake
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CarDetails = () => {

  let loc = useLocation()
  const { car } = loc.state

  return (
    <section className='container my-5'>
      <div className="row">
        <div className="col-6">
          <img src={`http://localhost:8000${car.picture}`} alt={car.id} className="img-fluid rounded shadow-lg" />
        </div>
        <div className="col-6">
          <div className="row text-center">
            <div className="col-6">
              <h3 className='text-primary'>
                <FontAwesomeIcon icon={faCar} className="me-2" />
                Brand:
                <span className='text-muted ms-2'>{car.brand}</span>  
              </h3>
            </div>
            <div className="col-6">
            <h3 className='text-primary'>
                <FontAwesomeIcon icon={faGlobe} className="me-2" />
                Country:
                <span className='text-muted ms-2'>{car.country}</span>  
              </h3>
            </div>
          </div>

          <hr />

          <div className="row mt-4">
            <h3 className='text-primary'>
              <FontAwesomeIcon icon={faDriversLicense} className="me-2" />
              Plate Numbers:
              <span className='text-muted ms-2'>{car.plate_numbers}</span>  
            </h3>
          </div>

          <div className="row mt-4">
            <h3 className='text-primary'>
              <FontAwesomeIcon icon={faNoteSticky} className="me-2" />
              Status:
              <span className='text-muted ms-2'>{car.status}</span>  
            </h3>
          </div>

          <div className="row mt-4">
            <h3 className='text-primary'>
              <FontAwesomeIcon icon={faDollar} className="me-2" />
              Rental Price / Day:
              <span className='text-muted ms-2'>{car.rental_price}</span>  
            </h3>
          </div>

          <hr />

          <div className="row text-center mt-4">
            <h3 className='text-primary'>
              <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
              Posted:
              <span className='text-muted ms-2'>{car.created.split('T')[0]}</span>  
            </h3>
          </div>

          <hr />

        </div>
      </div>
      <div className="row mt-5 w-50 mx-auto">
        <Link to={`/car/rent/${car.id}`} state={{car: car}} className='btn btn-primary mt-5 btn-lg px-5'>
          <FontAwesomeIcon icon={faHandshake} className="me-2" />
          Rent This Car
        </Link>
      </div>
    </section>
  )
}

export default CarDetails