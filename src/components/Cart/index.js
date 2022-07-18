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
        </div>
    )
}

export default Cart;