import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BuyPart = (props) => {
  const { cartItems, addToCart } = props.state;

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const [sellingParts, setSellingParts] = useState([]);

  const [brands, setBrands] = useState([]);
  const [countries, setCountries] = useState([]);

  let getCountries = async () => {
    let response = await axios.get(
      "http://localhost:8000/api/parts/countries-list/"
    );

    if (response.status === 200) {
      setCountries(response.data.countries);
    }
  };

  let getBrands = async () => {
    let response = await axios.get(
      "http://localhost:8000/api/parts/brands-list/"
    );

    if (response.status === 200) {
      setBrands(response.data.brands);
    }
  };

  let getSellingParts = async (brand='', country='') => {
    let response = await axios.get(
      `http://localhost:8000/api/parts/parts-list/?brand=${brand}&country=${country}`
    );

    if (response.status === 200) {
      setSellingParts(response.data);
    }
  };

  let handleBrandChange = (event) => {
    let brand = event.target.value;
    setSelectedBrand(brand);
    getSellingParts(brand, selectedCountry);
  };

  let handleCountryChange = (event) => {
    let country = event.target.value;
    setSelectedCountry(country);
    getSellingParts(selectedBrand, country);
  };

  useEffect(() => {
    getSellingParts();
    getCountries();
    getBrands();
  }, []);

  return (
    <section className="mt-5 py-3">
      <div className="container">
        <h2 className="text-center">Parts for Sale</h2>
        <div className="row mt-5">
          <h4 className="text-center">Filter</h4>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="country-select" className="form-label">
                Country:
              </label>
              <select
                id="country-select"
                className="form-select"
                onChange={handleCountryChange}
              >
                <option value="">All countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="brand-select" className="form-label">
                Brand:
              </label>
              <select
                id="brand-select"
                className="form-select"
                onChange={handleBrandChange}
              >
                <option value="">All brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="row mt-5 d-flex justify-content-center">
          {sellingParts.length !== 0 ? (
            sellingParts.map((part) => (
              <div className="col-4 mb-3" key={part.id}>
                <div className="card shadow-lg rounded">
                  <span className="rental__card-price bg-primary text-white">
                    {part.price}$
                  </span>
                  <img
                    src={`http://localhost:8000${part.picture}`}
                    alt={part.name}
                    className="card-img-top rental__card-img"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">{part.name}</h5>
                    <p className="card-text text-center">{part.country}</p>
                  </div>
                  <div className="card-footer text-center">
                    <button
                      className="btn btn-primary"
                      id={`item-${part.id}`}
                      onClick={() => addToCart(part)}
                    >
                      Add To Cart
                      <FontAwesomeIcon icon={faCartShopping} className="ms-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              We don't have any car parts yet!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BuyPart;
