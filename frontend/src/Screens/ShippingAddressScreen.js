import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/CartAction'
import CheckOutSteps from '../components/CheckOutSteps'

export default function ShippingAddressScreen(props) {
    const userSignin = useSelector((state)=> state.userSignin)
    const {userInfo} = userSignin

    const cart = useSelector((state)=> state.cart)
    const {shippingAddress} = cart

    if(!userInfo){
        props.history.push('/signin')
    }
    const [fullName, setFullName] = useState(shippingAddress.fullName)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country}))
        props.history.push('/payment')
    }

    return (
        <div >
            <CheckOutSteps step1 step2></CheckOutSteps>
            <div className='form'>
                <form  onSubmit={submitHandler}>
                    <ul className="form-container">
                        <div>
                            <h1>Shipping Address</h1>
                        </div>
                        <li>
                            <label htmlFor="fullName">Full Name</label>
                            <input type='text' id='fullName' placeholder='Enter Full Name' value={fullName} onChange={(e)=> setFullName(e.target.value)} required  />
                        </li>
                        <li>
                            <label htmlFor="address">Address</label>
                            <input type='text' id='address' placeholder='Enter Address' value={address} onChange={(e)=> setAddress(e.target.value)} required  />
                        </li>
                        <li>
                            <label htmlFor="city">City</label>
                            <input type='text' id='city' placeholder='Enter City Name' value={city} onChange={(e)=> setCity(e.target.value)} required  />
                        </li>
                        <li>
                            <label htmlFor="postalCode">Pin Code</label>
                            <input type='text' id='postalCode' placeholder='Enter Pin Code' value={postalCode} onChange={(e)=> setPostalCode(e.target.value)} required  />
                        </li>
                        <li>
                            <label htmlFor="country">Country</label>
                            <input type='text' id='country' placeholder='Country' value={country} onChange={(e)=> setCountry(e.target.value)} required  />
                        </li>
                        <li>
                            <label />
                            <button className='primary' type='submit'>Continue</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    )
}
