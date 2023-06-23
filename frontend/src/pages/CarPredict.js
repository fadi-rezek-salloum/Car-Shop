import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const CarPredict = () => {
  const [t, i18n] = useTranslation();

  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [kmDriven, setKmDriven] = useState("");
  const [fuel, setFuel] = useState("Petrol");
  const [sellerType, setSellerType] = useState("Individual");
  const [transmission, setTransmission] = useState("Automatic");
  const [owner, setOwner] = useState("First Owner");
  const [mileage, setMileage] = useState("");
  const [engine, setEngine] = useState("");
  const [maxPower, setMaxPower] = useState("");
  const [seats, setSeats] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      name: name,
      year: year,
      km_driven: kmDriven,
      fuel: fuel,
      seller_type: sellerType,
      transmission: transmission,
      owner: owner,
      mileage: mileage,
      engine: engine,
      max_power: maxPower,
      seats: seats,
    };

    let response = await axios.post(
      "http://localhost:8000/api/cars/predict-selling-price/",
      data
    );
    if (response.status === 200) {
      let alert = document.getElementById("predictedPrice")
      alert.classList.add("d-block")
      alert.classList.remove("d-none")
      alert.textContent = parseFloat(response.data.result) + "$";
    }
  };

  return (
    <section className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            {t("details__brand")}
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="year" className="form-label">
            {t("predict__year")}
          </label>
          <input
            type="text"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="kmDriven" className="form-label">
            {t("details__km")}
          </label>
          <input
            type="text"
            id="kmDriven"
            value={kmDriven}
            onChange={(e) => setKmDriven(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fuel" className="form-label">
            {t("details__fuel")}
          </label>
          <select
            id="fuel"
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
            required
            className="form-select"
          >
            <option value="Diesel">
              {i18n.language === "en" ? "Diesel" : "ديزل"}
            </option>
            <option value="LPG">
              {i18n.language === "en" ? "LPG" : "غاز البترول المسال"}
            </option>
            <option value="Petrol">
              {i18n.language === "en" ? "Petrol" : "بنزين"}
            </option>
            <option value="CNG">
              {i18n.language === "en" ? "CNG" : "غاز الطبيعي المضغوط"}
            </option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="sellerType" className="form-label">
            {t("seller_type")}
          </label>
          <input
            type="text"
            id="sellerType"
            value={sellerType}
            onChange={(e) => setSellerType(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="transmission" className="form-label">
            {t("details__transmission")}
          </label>
          <select
            id="transmission"
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
            required
            className="form-select"
          >
            <option value="Manual">
              {i18n.language === "en" ? "Manual" : "يدوي"}
            </option>
            <option value="Automatic">
              {i18n.language === "en" ? "Automatic" : "أوتوماتيك"}
            </option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="owner" className="form-label">
            {t("owner")}
          </label>
          <input
            type="text"
            id="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mileage" className="form-label">
            {t("mileage")}
          </label>
          <input
            type="text"
            id="mileage"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="engine" className="form-label">
            {t("details__capacity")}
          </label>
          <input
            type="text"
            id="engine"
            value={engine}
            onChange={(e) => setEngine(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="maxPower" className="form-label">
            {t("details__power")}
          </label>
          <input
            type="text"
            id="maxPower"
            value={maxPower}
            onChange={(e) => setMaxPower(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="seats" className="form-label">
            {t("details__seats")}
          </label>
          <input
            type="text"
            id="seats"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {t("predict")}
        </button>
      </form>
      <div
        className="alert d-none bg-primary text-white mt-5 text-center"
        id="predictedPrice"
      ></div>
    </section>
  );
};

export default CarPredict;
