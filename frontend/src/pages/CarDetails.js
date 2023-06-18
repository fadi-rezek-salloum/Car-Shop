import React from "react";

import { Link, useLocation } from "react-router-dom";

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
                {i18n.language === "ar" ? car.fuel_type_ar : car.fuel_type}
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
                  : car.transmission}
              </span>
            </h3>
          </div>

          <div className="row mt-2">
            <h3 className="text-primary">
              <FontAwesomeIcon icon={faNoteSticky} className="me-2" />
              {t("details__milage")}
              <span className="text-muted ms-2">{car.kms_driven}</span> KM
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
                  ? car.engine_capacity_ar
                  : car.engine_capacity}
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
