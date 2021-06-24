import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price })=> {
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_51J5iSYHGmEsKQTfjblLNbhMuqvlhdc1GiDK40Xk6rhQKS39DMSFrJQERYRlaBS3yp8UbpQtASspX1Z1xQHVxq5jx00VrXTd0wz'

    const onToken = token => {
        console.log(token);
        alert('Payment Successful')
    }

    return (
    <StripeCheckout 
       label ='Pay Now'
       name='CRWN Clothing Ltd.'
       billingAddress
       shippingAddress
       bitcoin
       image='https://svgshare.com/i/CUz.svg'
       description ={`Your total is ${price}`} 
       amount ={priceForStripe}
       panelLabel='Pay Now'
       token ={onToken}
       stripeKey={publishableKey}

    /> 
    )
}

export default StripeCheckoutButton