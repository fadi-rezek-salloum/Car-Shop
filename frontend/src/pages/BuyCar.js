import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import axios from "axios";

import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BuyCar = () => {
  const [sellingCars, setSellingCars] = useState([]);

  const [colors, setColors] = useState([]);
  const [colorsAr, setColorsAr] = useState([]);
  const [names, setNames] = useState([]);
  const [namesAr, setNamesAr] = useState([]);
  const [transmissions, setTransmission] = useState([]);
  const [transmissionsAr, setTransmissionAr] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0.0);
  const [minPrice, setMinPrice] = useState(0.0);
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");

  const [t, i18n] = useTranslation();

  let getColors = async () => {
    let response = await axios.get(
      "http://localhost:8000/api/cars/colors-list/"
    );

    if (response.status === 200) {
      setColors(response.data.colors);
      setColorsAr(response.data.colors_ar);
    }
  };

  let getNames = async () => {
    let response = await axios.get(
      "http://localhost:8000/api/cars/names-list/"
    );

    if (response.status === 200) {
      setNames(response.data.names);
      setNamesAr(response.data.names_ar);
    }
  };

  let getTransmissions = async () => {
    setTransmission(['Manual', 'Automatic'])
    setTransmissionAr(['عادي', 'أوتوماتيك'])
  };

  let getMaxPrice = async () => {
    let response = await axios.get("http://localhost:8000/api/cars/max-price/");

    if (response.status === 200) {
      let base_price = parseInt(response.data.max_price);
      let remainder = base_price % 500;
      setMaxPrice((base_price + (500 - remainder)));
    }
  };

  let getMinPrice = async () => {
    let response = await axios.get("http://localhost:8000/api/cars/min-price/");

    if (response.status === 200) {
      let base_price = parseInt(response.data.min_price);
      let remainder = base_price % 500;
      setMinPrice((base_price - remainder));
    }
  };

  let getSellingCars = async (color = "", max_price = 0.0, name="", transmission="") => {
    let response = await axios.get(
      `http://localhost:8000/api/cars/sell-cars-list/?color=${color}&max_price=${max_price}&name=${name}&transmission=${transmission}`
    );

    if (response.status === 200) {
      setSellingCars(response.data);
    }
  };

  let handleColorChange = (event) => {
    let color = event.target.value;
    setSelectedColor(color);
    getSellingCars(color, selectedPriceRange, selectedName, selectedTransmission);
  };

  let handleNameChange = (event) => {
    let name = event.target.value;
    setSelectedName(name);
    getSellingCars(selectedColor, selectedPriceRange ,name, selectedTransmission);
  };

  let handleTransmissionChange = (event) => {
    let transmission = event.target.value;
    if (transmission === 'ِأوتوماتيك' || transmission === 'Automatic') {
      transmission = 'A'
      setSelectedTransmission('A');
    }
    else {
      transmission = 'M'
      setSelectedTransmission('M')
    }
    getSellingCars(selectedColor, selectedPriceRange, selectedName, transmission);
  };

  let handlePriceRangeChange = (val) => {
    setSelectedPriceRange(val);
    getSellingCars(selectedColor, val, selectedName, selectedTransmission);
  };

  useEffect(() => {
    getSellingCars();
    getColors();
    getMaxPrice();
    getMinPrice();
    getNames();
    getTransmissions();
  }, []);

  return (
    <section className="mt-5 py-3">
      <div className="container">
        <h2 className="text-center">
          {t("buy__list-title")}
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
                {colors.map((color, i) => (
                  <option key={color} value={color}>
                    {i18n.language === 'ar' ? colorsAr[i] : color}
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
                min={minPrice}
                max={maxPrice}
                step="500"
                onChange={(event) =>
                  handlePriceRangeChange([event.target.value])
                }
              />
              <div className="d-flex justify-content-between">
                <span>${minPrice}</span>
                <span>${selectedPriceRange}</span>
                <span>${maxPrice}</span>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-3">
            <div className="form-group">
              <label htmlFor="name-select" className="form-label">
                {t("details__brand")}
              </label>
              <select
                id="name-select"
                className="form-select"
                onChange={handleNameChange}
              >
                <option value="">{t("details__brand")}</option>
                {names.map((name, i) => (
                  <option key={name} value={name}>
                    {i18n.language === 'ar' ? namesAr[i] : name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6 mt-3">
            <div className="form-group">
              <label htmlFor="transmission-select" className="form-label">
                {t("details__transmission")}
              </label>
              <select
                id="transmission-select"
                className="form-select"
                onChange={handleTransmissionChange}
              >
                <option value="">{t("details__transmission")}</option>
                {transmissions.map((transmission, i) => (
                  <option key={transmission} value={transmission}>
                    {i18n.language === 'ar' ? transmissionsAr[i] : transmission}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="row mt-5 d-flex justify-content-center">
          {sellingCars.filter((car) => !car.is_sold).length !== 0 ? (
            sellingCars.filter((car) => !car.is_sold).map((car) => (
              <div className="col-3 mb-3" key={car.id}>
                <div className="card shadow-lg rounded position-relative">
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
