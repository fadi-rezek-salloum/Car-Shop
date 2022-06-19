import React, { useContext, useState } from 'react'

import AuthContext from '../context/AuthContext';

import { useNavigate } from 'react-router-dom';

import {
  faDollarSign
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useAxios from '../utils/useAxios'

const Checkout = (props) => {

  const [ notes, setNotes ] = useState('')

  const { user } = useContext(AuthContext)

  const { cartItems, setCartItems } = props.state

  const itemsPrice = cartItems?.reduce((a, c) => a + c.price * c.qty, 0)

  let api = useAxios()
  let nav = useNavigate()

  const handleCheckout = async (e) => {
    e.preventDefault()
    
    const data = {
      user: user.user_id,
      cartItems: cartItems,
      notes: notes,
      total_price: itemsPrice
    }

    let response = await api.post('/api/bill/checkout/', data)

    if ( response.status === 200 ) {
      setCartItems([])
      nav('/')
    }
    
  }

  return (
    <main className='container mt-5'>
      <h1 className="text-center mb-5">
        Checkout
      </h1>

      {cartItems.length === 0 ? (<h1 className="text-center">You didn't select any item!</h1>) : (

        <form method="post" className='w-50 mx-auto' onSubmit={handleCheckout}>
          <h4 className="text-center">
            Total price is : ${itemsPrice}  
            <hr />
          </h4>

          <label htmlFor="notes" className='form-label'>Notes</label>
          <textarea name="notes" id="notes" className='form-control' placeholder='Notes...' value={notes} onChange={(e) => setNotes(e.target.value)} />

          <button type="submit" className='btn btn-primary mt-5 w-100'>
            <FontAwesomeIcon icon={faDollarSign} className='me-2' />
            Buy
          </button>
        </form>
      )}
    </main>
  )
}

export default Checkout