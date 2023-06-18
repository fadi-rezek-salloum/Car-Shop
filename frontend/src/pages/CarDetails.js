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

const CarDetails = () => {
  const [t, i18n] = useTranslation();

  let loc = useLocation();
  const { car } = loc.state;

  const getPredictedSellingPrice = async () => {
    let response = await axios.get(`http://localhost:8000/api/cars/predict-selling-price/${car.id}/`)

    if ( response.status === 200 ) {
      document.getElementById("predictedPrice").textContent = parseFloat(response.data.result) + '$';
    }
  }

  useEffect(() => {
    if ( car.for_sale ) {
      getPredictedSellingPrice()
    }
  })

  const TRANS_MAPPING = {
    'M': 'Manual',
    'A': 'Automatic'
  };

  function getDisplayName(value) {
    return TRANS_MAPPING[value] || value;
  }

  return (
    <section className="container my-5">
      <div className="row">
        <div className="col-5">
          <img
            src={`${car.picture}`}
            alt={car.id}
            className="img-fluid rounded shadow-lg"
          />
        </div>
        <div className="col-7">
          <div className="row text-center">
            <div className="col-6">
              <h3 className="text-primary">
                <FontAwesomeIcon icon={faCar} className="me-2" />
                {t("details__brand")}
                <span className="text-muted ms-2">
                  {i18n.language === "ar" ? car.name_ar : car.name}
                </span>
              </h3>
            </div>
            <div className="col-6">
              <h3 className="text-primary">
                <FontAwesomeIcon icon={faGlobe} className="me-2" />
                {t("details__country")}
                <span className="text-muted ms-2">
                  {i18n.language === "ar" ? car.country_ar : car.country}
                </span>
              </h3>
            </div>
          </div>

          <hr />

          <div className="row mt-2">
            <h3 className="text-primary">
              <FontAwesomeIcon icon={faDriversLicense} className="me-2" />
              {t("details__fuel")}
              <span className="text-muted ms-2">
                {i18n.language === "ar" ? car.fuel_ar : car.fuel}
              </span>
            </h3>
          </div>

          <div className="row mt-2">
            <h3 className="text-primary">
              <FontAwesomeIcon icon={faNoteSticky} className="me-2" />
              {t("details__transmission")}
              <span className="text-muted ms-2">
                {i18n.language === "ar"
                  ? car.transmission === "Automatic"
                    ? "أوتوماتيك"
                    : "عادي"
                  : getDisplayName(car.transmission)}
              </span>
            </h3>
          </div>

          <div className="row mt-2">
            <h3 className="text-primary">
              <FontAwesomeIcon icon={faNoteSticky} className="me-2" />
              {t("details__milage")}
              <span className="text-muted ms-2">
                {i18n.language === 'ar' ? car.mileage_ar : car.mileage}
              </span>
            </h3>
          </div>

          <div className="row mt-2">
            <h3 className="text-primary">
              <FontAwesomeIcon icon={faNoteSticky} className="me-2" />
              {t("details__km")}
              <span className="text-muted ms-2">{car.km_driven}</span> KM
            </h3>
          </div>

          <div className="row mt-2">
            <h3 className="text-primary">
              <FontAwesomeIcon icon={faNoteSticky} className="me-2" />
              {t("details__color")}
              <span className="text-muted ms-2">
                {i18n.language === "ar" ? car.color_ar : car.color}
              </span>
            </h3>
          </div>

          <div className="row mt-2">
            <h3 className="text-primary">
              <FontAwesomeIcon icon={faNoteSticky} className="me-2" />
              {t("details__seats")}
              <span className="text-muted ms-2">{car.seats}</span>
            </h3>
          </div>

          <div className="row mt-2">
            <h3 className="text-primary">
              <FontAwesomeIcon icon={faNoteSticky} className="me-2" />
              {t("details__power")}
              <span className="text-muted ms-2">
                {i18n.language === "ar" ? car.max_power_ar : car.max_power}
              </span>
            </h3>
          </div>

          <div className="row mt-2">
            <h3 className="text-primary">
              <FontAwesomeIcon icon={faNoteSticky} className="me-2" />
              {t("details__capacity")}
              <span className="text-muted ms-2">
                {i18n.language === "ar"
                  ? car.engine_ar
                  : car.engine}
              </span>
            </h3>
          </div>

          <div className="row mt-4">
            <h3 className="text-primary">
              {car.rental_price > 0 && (
                <div>
                  <FontAwesomeIcon icon={faDollar} className="me-2" />
                  {t("rent_summary-price")}
                  <span className="text-muted ms-2">{car.rental_price}</span>
                </div>
              )}

              {car.selling_price > 0 && (
                <div>
                  <FontAwesomeIcon icon={faDollar} className="me-2" />
                  {t("details__selling")}
                  <span className="text-muted ms-2">{car.selling_price}</span>
                  {car.for_sale &&
                  <div className="alert bg-primary text-white mt-3 d-flex justify-content-between">
                    {i18n.language === 'ar' ? <div>السعر المتوقع:</div> : <div>Predicted Price</div>}
                    <div id="predictedPrice"></div>
                    </div>
                  }
                </div>
              )}
            </h3>
          </div>

          <hr />

          <div className="row text-center mt-4">
            <h3 className="text-primary">
              <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
              {t("details__posted")}
              <span className="text-muted ms-2">
                {car.created.split("T")[0]}
              </span>
            </h3>
          </div>

          <hr />
        </div>
      </div>
      {car.for_sale === false && (
        <div className="row mt-5 w-50 mx-auto">
          <Link
            to={`/car/rent/${car.id}`}
            state={{ car: car }}
            className="btn btn-primary mt-5 btn-lg px-5"
          >
            <FontAwesomeIcon icon={faHandshake} className="me-2" />
            {t("details__rent")}
          </Link>
        </div>
      )}
      {car.for_sale && (
        <div className="row mt-5 w-50 mx-auto">
          <Link
            to={`/car/buy/${car.id}`}
            state={{ car: car }}
            className="btn btn-primary mt-5 btn-lg px-5"
          >
            <FontAwesomeIcon icon={faHandshake} className="me-2" />
            {t("details__buy")}
          </Link>
        </div>
      )}
    </section>
  );
};

export default CarDetails;
