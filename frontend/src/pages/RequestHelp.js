import React, { useState, useRef, useEffect, useContext } from 'react'

import mapboxgl from 'mapbox-gl';

import useAxios from '../utils/useAxios'
import AuthContext from '../context/AuthContext';

import { useTranslation } from 'react-i18next';

import FullScreenAlert from '../components/FullScreenAlert'

const RequestHelp = () => {

  mapboxgl.accessToken = 'pk.eyJ1IjoidW5pdmVyc2l0eXByb2plY3QiLCJhIjoiY2w0MHl5dmllMDEyYTNqa2N4eWkzdTh0eiJ9.KcdXMnpdvR-ahofsdWlKTQ'

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(37.9968);
  const [lat, setLat] = useState(34.8021);
  const [zoom, setZoom] = useState(7);

  const [t, i18n] = useTranslation();

  let [successMsg, setSuccessMsg] = useState(false)

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat],
    zoom: zoom,
    });

    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      }),
    );
  }, [lng, lat, zoom]);

  useEffect(() => {
    if (!map.current) return;
    map.current.on('move', () => {
    setLng(map.current.getCenter().lng.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().toFixed(2));
    });
  });

  let { user } = useContext(AuthContext)

  let api = useAxios()

  const handleHelpSuccess = async () => {

    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      const data = {
        lng: lng,
        lat: lat,
        user_id: user.user_id
      }

      let response = await api.post('/api/help/', data)

      if( response.status === 200 ) {
        setSuccessMsg(true)
      }
    }

    else if (query.get('canceled')) {
      alert('Error in Handling Payment!')
    }
  }

  useEffect(() => {
    handleHelpSuccess();
  })


  return (
    <div className='container mt-5'>
      {successMsg && <FullScreenAlert message={t("request__success")} />}
      <h1 className="my-5 text-center">
        {t("request__title")}
      </h1>
      <div ref={mapContainer} className="map-container rounded shadows-lg" style={{'height': '500px'}}>
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat}
        </div>
      </div>
      <div className="row my-5 text-center">
      <form action='http://localhost:8000/api/help/create-checkout-session/' method='POST'>
        <button className="btn btn-primary w-50 mx-auto my-5" type='submit'>
          {t("request__btn")}
        </button>
      </form>
      </div>
    </div>
  )
}

export default RequestHelp