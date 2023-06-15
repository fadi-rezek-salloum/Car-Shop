import React from 'react'

import { Link } from 'react-router-dom'

import {
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cart = (props) => {

  const { cartItems, addToCart, removeFromCart } = props.state;

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0)

  return (
    <main className='container mt-5'>
      <h1 className='text-center my-5'>Cart Items</h1>
      { cartItems?.length === 0 && <h3 className='text-center py-5'>Cart is empty</h3> }

      <ul className='list-group'>
        { cartItems.map((item) => (
          <li key={item.id} className='list-group-item'>
            <div className="row">
              <div className="col-4">
                {item.name}
              </div>
              <div className="col-4">
                <button onClick={() => addToCart(item)} className={item.qty >= item.in_stock ? 'btn btn-primary mx-5 px-3 disabled' : 'btn btn-primary mx-5 px-3' } disabled={item.qty >= item.in_stock ? true : false}>
                  +
                </button>
                <button onClick={() => removeFromCart(item)} className='btn btn-danger mx-5 px-3'>
                  -
                </button>
              </div>
              <div className="col-4 text-right">
                { item.qty } X ${item.price}
              </div>
            </div>
          </li>
        ))}
      </ul>

      { cartItems.length !== 0 && (
        <div className="row mt-5 text-center">
          <hr />
          <h5>Total: ${itemsPrice}</h5>
        </div>
      )}

      { cartItems.length !== 0 && (
        <div className="row mt-5 text-center">
          <hr />
          <Link to="/checkout" state={{cartItems: cartItems}} className='btn btn-success w-50 btn-lg mx-auto mt-5'>
            <FontAwesomeIcon icon={faCheckCircle} className='me-2' />
            Checkout
          </Link>
        </div>
      )}

    </main>
  )
}

export default Cart