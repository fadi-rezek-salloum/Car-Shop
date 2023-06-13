import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BuyCar = () => {
  const [sellingCars, setSellingCars] = useState([]);

  let getSellingCars = async () => {
    let response = await axios.get(
      "http://localhost:8000/api/cars/sell-cars-list/"
    );

    if (response.status === 200) {
      setSellingCars(response.data);
    }
  };

  useEffect(() => {
    getSellingCars();
  }, []);

  return (
    <section className="mt-5 py-3">
      <div className="container">
        <h2 className="text-center">Cars for Sale</h2>
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
  );
};

export default BuyCar;
