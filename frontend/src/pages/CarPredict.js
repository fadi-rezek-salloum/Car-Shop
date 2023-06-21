import React, { useEffect } from "react";

import { Link, useLocation } from "react-router-dom";

import axios from "axios"

import { useTranslation } from "react-i18next";

import {
  faCar,
  faGlobe,
  faNoteSticky,
  faDriversLicense,
  faDollar,
  faCalendarAlt,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CarPredict = () => {
  const [t, i18n] = useTranslation();

  // const getPredictedSellingPrice = async () => {
  //   let response = await axios.get(`http://localhost:8000/api/cars/predict-selling-price/${car.id}/`)

  //   if ( response.status === 200 ) {
  //     document.getElementById("predictedPrice").textContent = parseFloat(response.data.result) + '$';
  //   }
  // }

    const getPredictedPrice = async (e) => {
        e.preventDefault()
        let name = document.getElementById('name').value
        let response = await axios.get(`http://localhost:8000/api/cars/predict-selling-price/${name}/`)

        if ( response.status === 200 ) {
            document.getElementById("predictedPrice").textContent = parseFloat(response.data.result) + '$';
        }
    }


  return (
    <section className="container my-5">
      <form onSubmit={(e) => getPredictedPrice(e)}>
        <label htmlFor="name" className="form-label">
            {t("details__brand")}
        </label>
        <input type="text" id="name" required className="form-control" />
        <button type="submit" className="btn btn-primary mt-3">
            {t("predict")}
        </button>
      </form>
      <div className="alert bg-primary text-white mt-5 text-center" id="predictedPrice"></div>
    </section>
  );
};

export default CarPredict;
