import React from "react"
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import './index.css'

const PaymentForm = ({ clicked, checkoutToken, onCaptureCheckout }) => {
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    console.log(checkoutToken)
    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });
    
        if (error) {
            console.log(error);
        } else {
            if (checkoutToken.live.line_items.length === 0) {
                alert('Your cart is empty.')
            } else {
                const orderData = {
                    line_items: checkoutToken.live.line_items,
                    customer: { firstname: event.target.firstname.value, lastname: event.target.lastname.value, email: event.target.email.value },
                    shipping: { 
                        name: 'Free', 
                        street: event.target.billing_address.value, 
                        town_city: event.target.city.value, 
                        county_state: 'ON', 
                        postal_zip_code: event.target.post_zip.value, 
                        country: 'CA'
                    },
                    fulfillment: { shipping_method: checkoutToken.shipping.available_options[0].id},
                    billing: {
                    name: event.target.firstname.value + " " + event.target.lastname.value,
                    street: event.target.billing_address.value,
                    town_city: event.target.city.value,
                    county_state: event.target.prov_state.value,
                    country: event.target.country.value,
                    postal_zip_code: event.target.post_zip.value
                    },
                    payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id
                    }
                    }
                };
                onCaptureCheckout(checkoutToken.id, orderData);
                alert('Purchase succesful, time to drop some bangers!')
                event.target.reset()
                cardElement.clear()
            }
        }
    }
    
    return (     
        <div className={clicked ? "payment-form":"payment-form active"}>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>{({ elements, stripe }) => (
                <form className="info-form" onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                    <input name="firstname" placeholder="First Name"/>
                    <input name="lastname" placeholder="Last Name"/>
                    <input name="billing_address" placeholder="Address Line"/>
                    <input name="city" placeholder="City"/>
                    <input name="prov_state" placeholder="Province/State"/>
                    <input name="country" placeholder="Country"/>
                    <input name="post_zip" placeholder="Postal Code/Zip Code"/>
                    <input name="number" placeholder="Telephone Number"/>
                    <input name="email" placeholder="Email Address"/>
                    <br/> <br/>
                    <CardElement options={{hidePostalCode: true}}/>
                    <br /> <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button type="submit" variant="contained" disabled={!stripe}>
                        {checkoutToken? "Pay " + checkoutToken.live.subtotal.formatted_with_symbol:"Pay $0.00"}
                    </button>
                    </div>
                </form>
                )}
                </ElementsConsumer>
            </Elements>
        </div>
    )
}

export default PaymentForm