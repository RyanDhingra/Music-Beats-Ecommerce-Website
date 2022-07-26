import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/index.js"
import Featured from "./components/Featured/index.js";
import Beats from "./components/Beats/index.js";
import Contact from "./components/Contact/index.js";
import Cart from "./components/Cart/index.js";
import { commerce } from './lib/index.js';

function App() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errMsg, setErrMsg] = useState('');
  const [kits, setKits] = useState([]);
  const [beats1, setBeats1] = useState([]);
  const [beats2, setBeats2] = useState([]);
  const [featured, setFeatured] = useState([]);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  }

  const handleAddToCart = async (productID, variant_groupID, variantID) => {
    let duplicate = false;
    for (let x = 0; x < cart.line_items.length; x++) {
      if (cart.line_items[x].product_id === productID) {
        duplicate = true;
        alert("Item is already in your cart.");
      }
    }
    let option = {}
    option[variant_groupID] = variantID

    if (!duplicate) {
      const item = await commerce.cart.add(productID, 1, option)
      setCart(item.cart)
      alert("Item successfully added to cart.")
    }
  }

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve()
    setCart(cart);
  }

  const handleRemoveFromCart = async (productID) => {
    const { cart } = await commerce.cart.remove(productID);
    setCart(cart);
    alert("Item successfully removed from cart.")
  }

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    alert("Cart has been emptied successfully.")
    setCart(cart);
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh()
    setCart(newCart);
  }

  const handleCaptureCheckout = async (checkoutTokenID, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenID, newOrder)
      setOrder(incomingOrder);
      refreshCart();
      alert("Purchase successful! Please check your email for a confirmation letter. Your beat(s) and contract will be sent within 24 hours. Thanks!")
    } catch (error) {
      setErrMsg(error.data.error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  useEffect(() => {
    let tempFeatured = []
    let tempBeats = []
    let tempKits = []

    for (let x = 0; x < products.length; x++) {
      if (products[x].categories[0].name === 'Beats') {
        tempBeats.push(products[x]);
      } else if (products[x].categories[0].name === 'Featured') {
        tempFeatured.push(products[x]);
        tempBeats.push(products[x])
      } else if (products[x].categories[0].name === 'Kits') {
        tempKits.push(products[x]);
      }
    }

    while (tempKits.length >= 5) {
      tempKits.pop();
      if (tempKits.length <= 4) {
        break;
      }
    }

    const half = Math.ceil(tempBeats.length/2)
    const tempBeats1 = tempBeats.slice(0 , half)
    const tempBeats2 = tempBeats.slice(half)
    setKits(tempKits);
    setFeatured(tempFeatured);
    setBeats1(tempBeats1)
    setBeats2(tempBeats2)

  }, [products]);

  return (
    <div className="App">
      <Navbar/>
      <Featured featuredBeats={featured}/>
      <Beats beats1={beats1} beats2={beats2} kits={kits} onAddToCart={handleAddToCart} />
      <Contact/>
      <Cart currCart={cart} handleRemoveFromCart={handleRemoveFromCart} handleEmptyCart={handleEmptyCart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errMsg}/>
    </div>
  );
}

export default App;
