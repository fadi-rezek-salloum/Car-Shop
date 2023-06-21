import React, { useState, useEffect } from "react";

import axios from "axios";

import { useTranslation } from "react-i18next";

import { faCar, faBatteryCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomerHistory = () => {
  const [history, setHistory] = useState([]);

  const [t, i18n] = useTranslation();

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString();
  };

  let getHistory = async () => {
    const token = JSON.parse(localStorage.getItem("authTokens")).access;
    const response = await axios.get("http://localhost:8000/api/history/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      setHistory(response.data);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <section className="mt-5 py-3">
      <div className="container">
        <h2 className="text-center">{t("history__title")}</h2>
        {history.length !== 0 ? (
          history.map((item) => (
            <div className="row mt-3 d-flex justify-content-center">
              <div className="card w-100 shadow-lg">
                <div className="card-body py-2 d-flex justify-content-between">
                  <span>
                    {item.item_type === "car" ? (
                      <FontAwesomeIcon icon={faCar} className="mx-2" />
                    ) : (
                      <FontAwesomeIcon icon={faBatteryCar} className="mx-2" />
                    )}
                    {item.item_type === "part" ||
                    (item.item_type === "car" && item.item_is_sold) === true ? (
                      <span>{t("history__buy")}</span>
                    ) : (
                      <span>{t("history__rent")}</span>
                    )}
                    {item.item_name}
                  </span>
                  <span>{formatDate(item.created)}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">{t("history__empty")}</div>
        )}
      </div>
    </section>
  );
};

export default CustomerHistory;
