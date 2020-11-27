import React, { useState } from 'react'
import CheckOutSteps from '../components/CheckOutSteps'
import {useDispatch, useSelector} from 'react-redux'
import { savePaymentMethod } from '../actions/CartAction'

export default function PaymentMethodScreen(props) {
    const cart = useSelector((state)=> state.cart)
    const {shippingAddress} = cart
    if(!shippingAddress.address){
        props.history.push('/shipping')
    }
    const [paymentMethod, setPaymentMethod] = useState('paypal')
    const dispatch = useDispatch()

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        props.history.push('/placeorder')
    }

    return (
        <div>
            <CheckOutSteps step1 step2 step3></CheckOutSteps>
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <div>
                            <h1>Choose Payment Method</h1>
                        </div>
                        <li>
                            <div>
                                <input type="radio" id="paypal" value="paypal" name="paymentMethod" required checked onChange={(e)=> setPaymentMethod(e.target.value)} />
                            </div>
                            <label htmlFor="paypal">Paypal</label>
                        </li>
                        <li>
                            <div>
                                <input type="radio" id="POD" value="Pay on Delivery" name="paymentMethod" required onChange={(e)=> setPaymentMethod(e.target.value)} />
                            </div>
                            <label htmlFor="POD">Pay on Delivery</label>
                        </li>
                        <li>
                            <button className="primary" type="submit">Continue</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    )
}
