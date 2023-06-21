import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import { useNavigate } from 'react-router-dom'

import axios from "axios";

import { useTranslation } from "react-i18next"

import mapIcon from '../images/map-icon.jpg'

const FindCar = () => {

  const [rentCars, setRentCars] = useState([]);

  const [ t, i18n ] = useTranslation();

  mapboxgl.accessToken =
    "pk.eyJ1IjoidW5pdmVyc2l0eXByb2plY3QiLCJhIjoiY2w0MHl5dmllMDEyYTNqa2N4eWkzdTh0eiJ9.KcdXMnpdvR-ahofsdWlKTQ";

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(37.9968);
  const [lat, setLat] = useState(34.8021);
  const [zoom, setZoom] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );

    map.current.on("load",async() => {
      let response = await axios.get(
        "http://localhost:8000/api/cars/rental-cars-list/"
      );
  
      if (response.status === 200) {
        response.data.forEach((car) => {        
        const el = document.createElement("div");
        el.className = "marker shadow";
        el.style.backgroundImage = `url('${mapIcon}')`
        el.style.backgroundRepeat = "no-repeat"
        el.style.backgroundPosition = "center center"
        el.style.backgroundSize = "contain"

        const tooltip = document.createElement("div");
        tooltip.className = "data-box";

        const image = document.createElement("img");
        image.src = car.picture;
        image.style.width = "275px"
        image.style.height = "150px"
        image.style.objectFit = "cover"
        tooltip.appendChild(image);

        const title = document.createElement("h4");
        title.textContent = car.name;
        title.style.marginTop = "25px"
        title.style.textAlign = 'center'
        tooltip.appendChild(title);

        const link = document.createElement("a");
        link.style.marginTop = "15px"
        link.textContent = "View Details";
        link.className = "btn btn-primary w-100";
        link.addEventListener('click', () => navigate(`/car/details/${car.id}`, { state: { car: car } }));
        tooltip.appendChild(link);

        el.appendChild(tooltip);

        new mapboxgl.Marker(el)
          .setLngLat(car.cords)
          .addTo(map.current);
      });
      }

    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div className="container mt-5">
      <h1 className="my-5 text-center">
        {t("find__title")}
      </h1>
      <div
        ref={mapContainer}
        className="map-container rounded shadows-lg"
        style={{ height: "700px" }}
      >
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat}
        </div>
      </div>
    </div>
  );
};

export default FindCar;