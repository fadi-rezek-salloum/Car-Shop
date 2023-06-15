import React, { useContext, useState, useEffect } from 'react'

import { useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

import FullScreenAlert from '../components/FullScreenAlert'

import useAxios from '../utils/useAxios'

const RentCarCheckout = () => {

    const [ startDate, setStartDate ] = useState('')
    const [ endDate, setEndDate ] = useState('')
    const [ location, setLocation ] = useState('')

    let [successMsg, setSuccessMsg] = useState(false)

    const { user } = useContext(AuthContext)

    let loc = useLocation()
    const { car } = loc.state

    let api = useAxios()

    useEffect(() => {
      if ( startDate.length !== 0 && endDate.length !== 0 ) {
        let sDate = new Date(startDate)
        let eDate = new Date(endDate)
        let diffTime = Math.abs(sDate - eDate);

        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        let p = document.getElementById('totalPrice')
        p.innerHTML = `Total: $${(car.rental_price * 0.25) + (car.rental_price * days)}`
      }
    }, [startDate, endDate, car.rental_price])

    const handleRent = async (e) => {
      e.preventDefault();

      const data = {
        car: car.id,
        customer: user.user_id,
        start_date: startDate,
        end_date: endDate,
        location: location,
        tax: (car.rental_price * 0.25)
      }

      let response = await api.post('/api/cars/rent-car/', data)

      if ( response.status === 201 ) {
        setSuccessMsg(true);
      } else {
        alert('Something wrong happened!')
      }
    } 

  return (
    <section className='container mt-5'>
      {successMsg && <FullScreenAlert message="You have successfully rented this car!" />}
      
      <h1 className="text-center">
        Rent Car
      </h1>
      <form onSubmit={handleRent} className="w-50 mx-auto mt-5">
        <label htmlFor="startDate" className='form-label'>Start Date</label>
        <input type="date" name="startDate" id="startDate" className='form-control' value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        <br />

        <label htmlFor="endDate" className='form-label'>End Date</label>
        <input type="date" name="endDate" id="endDate" className='form-control' value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        <br />

        <label htmlFor="location" className='form-label'>Receiving Location</label>
        <input type="text" name="location" id="location" className='form-control' value={location} onChange={(e) => setLocation(e.target.value)} placeholder='Location...' required />
        <br />
        <br />

        <hr />

        <h4>
          Summary:
        </h4>

        <p className="form-text">
          Car Brand: {car.name}
        </p>

        <p className="form-text">
          Price/Day: ${car.rental_price}
        </p>

        <p className="form-text">
          Tax: ${car.rental_price * 0.25}
        </p>

        <p className="form-text" id='totalPrice'>
        </p>

        <button type="submit" className='btn btn-primary w-100 mt-5'>
          Rent This Car
        </button>

      </form>
    </section>
  )
}

export default RentCarCheckout