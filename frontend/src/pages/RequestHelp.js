import React, { useState, useRef, useEffect, useContext } from 'react'

import mapboxgl from 'mapbox-gl';

import useAxios from '../utils/useAxios'
import AuthContext from '../context/AuthContext';

import FullScreenAlert from '../components/FullScreenAlert'

const RequestHelp = () => {

  mapboxgl.accessToken = 'pk.eyJ1IjoidW5pdmVyc2l0eXByb2plY3QiLCJhIjoiY2w0MHl5dmllMDEyYTNqa2N4eWkzdTh0eiJ9.KcdXMnpdvR-ahofsdWlKTQ'

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(37.9968);
  const [lat, setLat] = useState(34.8021);
  const [zoom, setZoom] = useState(7);

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
  });

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

  const handleHelp = async () => {

    const data = {
      lng: lng,
      lat: lat,
      user_id: user.user_id
    }

    let response = await api.post('/api/help/', data)

    if( response.status === 200 ) {
      <FullScreenAlert message="You have requested help successfully!" />
    }
  }


  return (
    <div className='container mt-5'>
      <h1 className="my-5 text-center">
        Request Help Based On Your Location
      </h1>
      <div ref={mapContainer} className="map-container rounded shadows-lg" style={{'height': '500px'}}>
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat}
        </div>
      </div>
      <div className="row my-5">
      <button className="btn btn-primary w-50 mx-auto my-5" onClick={handleHelp}>
        Request Help
      </button>
      </div>
    </div>
  )
}

export default RequestHelp