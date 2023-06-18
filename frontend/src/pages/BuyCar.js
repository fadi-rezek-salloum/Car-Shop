import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import axios from "axios";

import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BuyCar = () => {
  const [sellingCars, setSellingCars] = useState([]);

  const [colors, setColors] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0.0);
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");

  const [t, i18n] = useTranslation();

  let getColors = async () => {
    let response = await axios.get(
      "http://localhost:8000/api/cars/colors-list/"
    );

    if (response.status === 200) {
      setColors(response.data.colors);
    }
  };

  let getMaxPrice = async () => {
    let response = await axios.get("http://localhost:8000/api/cars/max-price/");

    if (response.status === 200) {
      setMaxPrice(parseInt(response.data.max_price) + 1000);
    }
  };

  let getSellingCars = async (color = "", max_price = 0.0) => {
    let response = await axios.get(
      `http://localhost:8000/api/cars/sell-cars-list/?color=${color}&max_price=${max_price}`
    );

    if (response.status === 200) {
      setSellingCars(response.data);
    }
  };

  let handleColorChange = (event) => {
    let color = event.target.value;
    setSelectedColor(color);
    getSellingCars(color, selectedPriceRange);
  };

  let handlePriceRangeChange = (val) => {
    setSelectedPriceRange(val);
    getSellingCars(selectedColor, val);
  };

  useEffect(() => {
    getSellingCars();
    getColors();
    getMaxPrice();
  }, []);

  return (
    <section className="mt-5 py-3">
      <div className="container">
        <h2 className="text-center">
          {t("buy__list-title")}
          Cars for Sale
        </h2>
        <div className="row mt-5">
          <h4 className="text-center">{t("buy__part-filter")}</h4>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="color-select" className="form-label">
                {t("details__color")}
              </label>
              <select
                id="color-select"
                className="form-select"
                onChange={handleColorChange}
              >
                <option value="">{t("details__color")}</option>
                {colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="price-slider" className="form-label">
                {t("details__selling")}
              </label>
              <input
                type="range"
                className="form-range"
                min="0"
                max={maxPrice}
                step="500"
                onChange={(event) =>
                  handlePriceRangeChange([event.target.value])
                }
              />
              <div className="d-flex justify-content-between">
                <span>$0</span>
                <span>${selectedPriceRange}</span>
                <span>${maxPrice}</span>
              </div>
            </div>
          </div>
        </div>
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
                      <span className="text-white fs-4">
                        {t("buy__list-sold")}
                      </span>
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
            <div className="col-12 text-center">{t("buy__list-empty")}</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BuyCar;
