import React, { useEffect, useState } from "react";
import { commerce } from '../../../lib/index.js';
import PaymentForm from './PaymentForm/index.js'

const Checkout = ({ clicked, cart, order, onCaptureCheckout, error }) => {
    const [checkoutToken, setCheckoutToken] = useState(null);

    useEffect(() => {
        const generateCheckoutToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart'})
                setCheckoutToken(token);
            } catch (error) {

            }
        }
        generateCheckoutToken();
    }, [cart]);
    console.log(cart)

    return (
            <PaymentForm clicked={clicked} checkoutToken={checkoutToken} onCaptureCheckout={onCaptureCheckout} cart={cart}/>
    )
}

export default Checkout