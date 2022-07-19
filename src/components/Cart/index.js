import React, { useState } from "react";
import './index.css'
import cartBG from '../../assets/cartBG.mp4'
import Checkout from './Checkout/index.js'

const Cart = ({ currCart, handleRemoveFromCart, handleEmptyCart, order, onCaptureCheckout, error }) => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    }

    return (
        <div className="cart-section" id="cart">
            <video className="cart-vid" src={cartBG} autoPlay loop muted/>
            <div className={clicked ? "item-list":"item-list active"}>
                <h1>
                My Cart
                </h1>
                {currCart.line_items?.map((item) => (
                <>
                    <h3 className="item-names">{item.name}</h3>
                    <button className="remove-item" onClick={() => handleRemoveFromCart(item.id)}>Remove Item</button>
                </>
                ))}
            </div>
            <button className={clicked ? "empty-cart":"empty-cart active"} onClick={handleEmptyCart} disabled={clicked}>Empty Cart</button>
            <button className={clicked ? "checkout":"checkout active"} onClick={handleClick} disabled={clicked}>Checkout</button>
            <button className={clicked ? "back-to-order active":"back-to-order"} onClick={handleClick} disabled={!clicked}>Back to Order</button>
            <Checkout clicked={clicked} cart={currCart} order={order} onCaptureCheckout={onCaptureCheckout} error={error}/>
            <img className="stripe-img" src="https://www.logo.wine/a/logo/Stripe_(company)/Stripe_(company)-Powered-by-Stripe-Logo.wine.svg" alt="Powered by Stripe"/>
            <img className="secure-img" src="https://icons-for-free.com/download-icon-secure+security+shield+icon-1320196720831486004_512.png" alt="Secure Payments"/>
        </div>
    )
}

export default Cart;