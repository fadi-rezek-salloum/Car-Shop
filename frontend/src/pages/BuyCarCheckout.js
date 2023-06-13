import React, { useContext, useEffect } from 'react'

import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

import FullScreenAlert from '../components/FullScreenAlert'

import useAxios from '../utils/useAxios'

const BuyCarCheckout = () => {

    const { user } = useContext(AuthContext)

    let nav = useNavigate()

    let loc = useLocation()
    const { car } = loc.state

    let api = useAxios();

    useEffect(() => {  
        let price = parseFloat(car.selling_price * 0.5) + parseFloat(car.selling_price)
        let p = document.getElementById('totalPrice');
        p.innerHTML = `Total: $${price}`
    } , [car.selling_price])

    const handleBuy = async (e) => {
      e.preventDefault();

      const data = {
        car: car.id,
        customer: user.user_id,
        tax: (car.selling_price * 0.5)
      }

      let response = await api.post('/api/cars/sell-car/', data)

      if ( response.status === 201 ) {
        <FullScreenAlert message="You have successfully bought this car!" />
      } else {
        alert('Something wrong happened!')
      }
    } 

  return (
    <section className='container mt-5'>
      <h1 className="text-center">
        Buy Car
      </h1>
      <form onSubmit={handleBuy} className="w-50 mx-auto mt-5">
        <hr />

        <h4>
          Summary:
        </h4>

        <p className="form-text">
          Car Brand: {car.name}
        </p>

        <p className="form-text">
          Price: ${car.selling_price}
        </p>

        <p className="form-text">
          Tax: ${car.selling_price * 0.5}
        </p>

        <p className="form-text" id='totalPrice'>
        </p>

        <button type="submit" className='btn btn-primary w-100 mt-5'>
          Buy This Car
        </button>

      </form>
    </section>
  )
}

export default BuyCarCheckout