import React, { useContext, useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import FullScreenAlert from "../components/FullScreenAlert";

import { useTranslation } from "react-i18next";

import useAxios from "../utils/useAxios";

const BuyCarCheckout = () => {
  const { user } = useContext(AuthContext);

  const [t, i18n] = useTranslation();

  let loc = useLocation();
  const { car } = loc.state;

  let api = useAxios();

  let [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    let price =
      parseFloat(car.selling_price * 0.5) + parseFloat(car.selling_price);
    let p = document.getElementById("totalPrice");
    p.innerHTML =
      i18n.language === "ar" ? `المجموع: $${price}` : `Total: $${price}`;
  }, [car.selling_price, i18n]);

  const handleBuy = async (e) => {
    e.preventDefault();

    const data = {
      car: car.id,
      customer: user.user_id,
      tax: car.selling_price * 0.5,
    };

    let response = await api.post("/api/cars/sell-car/", data);

    if (response.status === 201) {
      setSuccessMsg(true);
    } else {
      alert("Something wrong happened!");
    }
  };

  return (
    <section className="container mt-5">
      {successMsg && <FullScreenAlert message={t("buy__checkout")} />}

      <h1 className="text-center">{t("header__buy-car")}</h1>
      <form onSubmit={handleBuy} className="w-50 mx-auto mt-5">
        <hr />

        <h4>{t("rent__summary")}</h4>

        <p className="form-text">
          {t("rent_summary-brand")}
          {i18n.language === "ar" ? car.name_ar : car.name}
        </p>

        <p className="form-text">
          {t("details__selling")}${car.selling_price}
        </p>

        <p className="form-text">
          {t("rent_summary-tax")}${car.selling_price * 0.5}
        </p>

        <p className="form-text" id="totalPrice"></p>

        <button type="submit" className="btn btn-primary w-100 mt-5">
          {t("details__buy")}
        </button>
      </form>
    </section>
  );
};

export default BuyCarCheckout;
