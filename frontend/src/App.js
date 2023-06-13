import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useState } from "react";

import ProtectedRoutes from "./utils/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import CarDetails from "./pages/CarDetails";
import CustomerHistory from "./pages/CustomerHistory";
import BuyCar from "./pages/BuyCar";
import RentCar from "./pages/RentCar";
import BuyCarCheckout from "./pages/BuyCarCheckout";
import RentCarCheckout from "./pages/RentCarCheckout";

import RequestHelp from "./pages/RequestHelp"

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {

  const [ cartItems, setCartItems ] = useState([]);

  const addToCart = (part) => {

    const exist = cartItems.find(x => x.id === part.id);

    if ( exist ) {
      setCartItems(cartItems.map(x => x.id === part.id ? {...exist, qty: exist.qty + 1} : x))

      let item = document.getElementById(`item-${part.id}`)

      if (exist.qty >= exist.in_stock - 1) {
        item.classList.add('disabled')
        item.setAttribute('disabled', true)
      } else {
        item.classList.remove('disabled')
      }

    } else {
      setCartItems([...cartItems, {...part, qty: 1}])
    }
  } 

  const removeFromCart = (part) => {

    const exist = cartItems.find(x => x.id === part.id);

    if ( exist.qty === 1 ) {
      setCartItems(cartItems.filter((x) => x.id !== part.id))
    } else {
      setCartItems(cartItems.map(x => x.id === part.id ? {...exist, qty: exist.qty - 1} : x))
    }
  } 

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Header state={{ countCartItems: cartItems.length }} />
          <Routes>
            <Route path="/" element={<HomePage state={{addToCart: addToCart, cartItems: cartItems}} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/car/details/:id" element={<CarDetails />} />
            <Route path='/cart' element={<Cart state={{cartItems: cartItems, addToCart: addToCart, removeFromCart: removeFromCart}} />} />
            <Route path='/car/buy/' element={<BuyCar />} />
            <Route path='/car/rent/' element={<RentCar />} />

            <Route path='/' element={<ProtectedRoutes />}>
              <Route path='/customer-history' element={<CustomerHistory />} />
              <Route path='/car/rent/:id' element={<RentCarCheckout />} />
              <Route path='/car/buy/:id' element={<BuyCarCheckout />} />
              <Route path='/request-help' element={<RequestHelp />} />
              <Route path='/checkout' element={<Checkout state={{cartItems: cartItems, setCartItems: setCartItems}} />} />
            </Route>
          </Routes>

          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
