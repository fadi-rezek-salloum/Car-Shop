import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import { useTranslation } from "react-i18next";

import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RentCar = () => {
  const [rentCars, setRentCars] = useState([]);

  const [t, i18n] = useTranslation();

  let is_rented_now = (start_date_str, end_date_str) => {
    let start_date = new Date(start_date_str);
    let end_date = new Date(end_date_str);

    let input_date = new Date();

    return input_date >= start_date && input_date <= end_date;
  };

  let getRentCars = async () => {
    let response = await axios.get(
      "http://localhost:8000/api/cars/rental-cars-list/"
    );

    if (response.status === 200) {
      setRentCars(response.data);
    }
  };

  useEffect(() => {
    getRentCars();
  }, []);

  return (
    <section className="mt-5 py-3">
      <div className="container">
        <h2 className="text-center">{t("rent__list-title")}</h2>
        <div className="row mt-5 d-flex justify-content-center">
          {rentCars.length !== 0 ? (
            rentCars.map((car) => (
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
                      <span className="text-white fs-4">
                        {t("rent__list-rented")}
                        <br /> {car.rental_days[1]}
                      </span>
                    </div>
                  )}
                  <span className="rental__card-price bg-primary text-white">
                    {car.rental_price}$ / {t("rent__list-day")}
                  </span>
                  <img
                    src={`${car.picture}`}
                    alt={car.name}
                    className="card-img-top rental__card-img"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">
                      {i18n.language === "ar" ? car.name_ar : car.name}
                    </h5>
                    <p className="card-text text-center">{car.year}</p>
                  </div>
                  <div className="card-footer text-center">
                    <Link
                      to={`/car/details/${car.id}`}
                      state={{ car: car }}
                      className="btn btn-primary"
                    >
                      {t("rent__list-details")}
                      <FontAwesomeIcon icon={faCaretRight} className="ms-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">{t("rent__list-empty")}</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RentCar;
