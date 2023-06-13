import React, { useRef, useState, useEffect } from "react";

import { Link } from "react-router-dom";

import {
  faCaretDown,
  faCaretRight,
  faDollarSign,
  faCarBattery,
  faClock,
  faMapLocation,
  faCartShopping
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper';
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import axios from 'axios'

import car1 from '../images/car-1.jpg'
import car2 from '../images/car-2.jpg'
import car3 from '../images/car-3.jpg'

import m1 from '../images/m1.jpg'
import m2 from '../images/m2.jpg'
import m3 from '../images/m3.jpg'


const HomePage = (props) => {

  const servicesRef = useRef(null);

  const scrollToElement = () => servicesRef.current.scrollIntoView();

  const [rentalCars, setRentalCars] = useState([])
  const [sellingCars, setSellingCars] = useState([])
  const [parts, setParts] = useState([])

  const { cartItems, addToCart } = props.state;
  
  if (cartItems.length !== 0) {
    cartItems.forEach(item => {
      let part = document.getElementById(`item-${item.id}`)

      if (part) {
        if (item.qty >= item.in_stock) {
          part.setAttribute('disabled', true)
        }
      }
    })
  }

  let getRentalCars = async () => {
    let response = await axios.get("http://localhost:8000/api/cars/rental-cars-list/");

    if (response.status === 200) {
      setRentalCars(response.data);
    }
  };

  let getSellingCars = async () => {
    let response = await axios.get("http://localhost:8000/api/cars/sell-cars-list/");

    if (response.status === 200) {
      setSellingCars(response.data);
    }
  };

  let getParts = async () => {
    let response = await axios.get("http://localhost:8000/api/parts/parts-list/");

    if (response.status === 200) {
      setParts(response.data);
    }
  };

  let is_rented_now = (start_date_str, end_date_str) => {
    let start_date = new Date(start_date_str);
    let end_date = new Date(end_date_str);

    let input_date = new Date();

    return input_date >= start_date && input_date <= end_date;
  }

  useEffect(() => {
    getRentalCars();
    getSellingCars();
    getParts();
  }, []);

  return (
    <main>
      <section className="hero__section">
        <div className="container text-white">
          <h1 className="hero__section-h1">
            Welcome to <span className="text-primary">AutoMobile</span>
          </h1>
          <h4 className="hero__section-h4">
            For All <span className="text-primary">Cars</span> Needs!
          </h4>
          <button
            onClick={scrollToElement}
            className="btn btn-primary btn-lg hero__section-btn"
          >
            Our Services
            <FontAwesomeIcon icon={faCaretDown} className="ms-2" />
          </button>
        </div>
      </section>

      <section className="container mt-5" id="services" ref={servicesRef}>
        <div className="row">
          <div className="col-3">
            <div className="card services__card">
              <div className="card-body">
                <div className="card-title text-center">
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className="services__card-icon"
                  />
                </div>
                <div className="card-text">
                  <h4 className="text-center mt-5 font-weight-bold">
                    Car Rental
                  </h4>
                  <p className="text-center mt-5">
                    We offer car renting services for our customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card services__card">
              <div className="card-body">
                <div className="card-title text-center">
                  <FontAwesomeIcon
                    icon={faCarBattery}
                    className="services__card-icon"
                  />
                </div>
                <div className="card-text">
                  <h4 className="text-center mt-5 font-weight-bold">
                    Car Parts
                  </h4>
                  <p className="text-center mt-5">
                    We sell parts for all car models
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card services__card">
              <div className="card-body">
                <div className="card-title text-center">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="services__card-icon"
                  />
                </div>
                <div className="card-text">
                  <h4 className="text-center mt-5 font-weight-bold">
                    24/7 Support
                  </h4>
                  <p className="text-center mt-5">
                    We offer support services if you face any issue
                    with your car.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card services__card">
              <div className="card-body">
                <div className="card-title text-center">
                  <FontAwesomeIcon
                    icon={faMapLocation}
                    className="services__card-icon"
                  />
                </div>
                <div className="card-text">
                  <h4 className="text-center mt-5 font-weight-bold">
                    Get Help Anywhere
                  </h4>
                  <p className="text-center mt-5">
                    We offer services for fixing your car at any location and any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 py-3 px-5">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          navigation
          pagination={{ clickable: true }}
          slidesPerView={1}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          effect={"fade"}
        >
          <SwiperSlide>
            <img src={car1} alt="Car 1" className="img-fluid rounded shadow-lg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={car2} alt="Car 2" className="img-fluid rounded shadow-lg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={car3} alt="Car 3" className="img-fluid rounded shadow-lg" />
          </SwiperSlide>
        </Swiper>
      </section>

      <section className="mt-5 py-3" id="grey">
        <div className="container">
          <h2 className="text-center">
            Rental Cars
          </h2>
          <div className="row mt-5 d-flex justify-content-center">

          {rentalCars.length !== 0 ? (
            rentalCars.map((car) => (
              <div className="col-3 mb-3" key={car.id}>
                <div className="card shadow-lg rounded position-relative">
                  {is_rented_now(car.rental_days[0], car.rental_days[1]) && (
                    <div
                      className="position-absolute top-0 start-0 end-0 bottom-0 d-flex align-items-center justify-content-center"
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        zIndex: 1,
                      }}
                    >
                      <span className="text-white fs-4">Rented until <br /> {car.rental_days[1]}</span>
                    </div>
                  )}
                  <span className="rental__card-price bg-primary text-white">
                    {car.rental_price}$ / day
                  </span>
                  <img
                    src={`${car.picture}`}
                    alt={car.name}
                    className="card-img-top rental__card-img"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">{car.name}</h5>
                    <p className="card-text text-center">{car.year}</p>
                  </div>
                  <div className="card-footer text-center">
                    <Link
                      to={`/car/details/${car.id}`}
                      state={{ car: car }}
                      className="btn btn-primary"
                    >
                      View Details
                      <FontAwesomeIcon icon={faCaretRight} className="ms-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              We don't have any car for renting yet!
            </div>
          )}

          </div>
        </div>
      </section>

      <section className="mt-5 py-3">
        <div className="container">
          <h2 className="text-center">
            Selling Cars
          </h2>
          <div className="row mt-5 d-flex justify-content-center">

          {sellingCars.length !== 0 ? (
            sellingCars.map((car) => (
              <div className="col-3 mb-3" key={car.id}>
                <div className="card shadow-lg rounded position-relative">
                  {car.is_sold && (
                    <div
                      className="position-absolute top-0 start-0 end-0 bottom-0 d-flex align-items-center justify-content-center"
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        zIndex: 1,
                      }}
                    >
                      <span className="text-white fs-4">Sold</span>
                    </div>
                  )}
                  <span className="rental__card-price bg-primary text-white">
                    {car.selling_price}$
                  </span>
                  <img
                    src={`${car.picture}`}
                    alt={car.name}
                    className="card-img-top rental__card-img"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">{car.name}</h5>
                    <p className="card-text text-center">{car.year}</p>
                  </div>
                  <div className="card-footer text-center">
                    <Link
                      to={`/car/details/${car.id}`}
                      state={{ car: car }}
                      className="btn btn-primary"
                    >
                      View Details
                      <FontAwesomeIcon icon={faCaretRight} className="ms-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              We don't have any car for selling yet!
            </div>
          )}

          </div>
        </div>
      </section>

      <section className="mt-5 py-3" id="grey">
        <div className="container">
          <h2 className="text-center">
            Car Parts
          </h2>
          <div className="row mt-5 d-flex justify-content-center">

            { parts.length !== 0 ? (parts.map((part) => (
              <div className="col-4 mb-3" key={part.id}>
                <div className="card shadow-lg rounded">
                  <span className="rental__card-price bg-primary text-white">
                    {part.price}$
                  </span>
                  <img src={`http://localhost:8000${part.picture}`} alt={part.brand} className="card-img-top rental__card-img" />
                  <div className="card-body">
                    <h5 className="card-title text-center">
                      {part.name}
                    </h5>
                    <p className="card-text text-center">
                      {part.brand} - {part.country}
                    </p>

                  </div>
                  <div className="card-footer text-center">
                    <button className="btn btn-primary" id={`item-${part.id}`} onClick={() => addToCart(part)}>
                      Add To Cart
                      <FontAwesomeIcon icon={faCartShopping} className='ms-2' />
                    </button>
                  </div>
                </div>
              </div>
            ))) : <div className="col-12 text-center">We don't have any car parts yet!</div>}

          </div>
        </div>
      </section>

      <section className="mt-5" id="grey">
        <div className="container py-5">
          <div className="row">
            <div className="col-4">
              <div className="card rounded shadow-lg py-4">
                <img src={m1} alt="M1" className="members__img" />
                <div className="card-body text-center">
                  <div className="card-title h2">John Doe</div>
                  <div className="card-text">Backend Developer</div>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="card rounded shadow-lg py-4">
                <img src={m2} alt="M2" className="members__img" />
                <div className="card-body text-center">
                  <div className="card-title h2">Jane Doe</div>
                  <div className="card-text">Frontend Developer</div>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="card rounded shadow-lg py-4">
                <img src={m3} alt="M3" className="members__img" />
                <div className="card-body text-center">
                  <div className="card-title h2">Carolina Smith</div>
                  <div className="card-text">Graphic Designer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
