import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { sellerregister } from '../actions/userAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function SellerRegisterScreen(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(true)
    const dispatch = useDispatch()

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/'
    const sellerRegister = useSelector((state)=> state.sellerRegister)
    const {userInfo, loading, error} = sellerRegister

    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Password and Confirm Password should match')
        }else{
            dispatch(sellerregister(name, email, password, isAdmin))
        }
        
    }

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect)
        }
    }, [userInfo])

    return (
        <div className='form'>
            <form  onSubmit={submitHandler}>
                <ul className='form-container'>
                    <div>
                        <h1>Create a new Account</h1>
                    </div>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                    <li>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="Enter Name" required onChange={e => setName(e.target.value)} />
                    </li>    
                    <li>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" placeholder="Enter Email" required onChange={e => setEmail(e.target.value)} />
                    </li>    
                    <li>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter Password" required onChange={e => setPassword(e.target.value)} />
                    </li>  
                    <li>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmpassword" placeholder="Enter Confirm Password" required onChange={e => setConfirmPassword(e.target.value)} />
                    </li>  
                    <li>
                        <label />
                        <button className="primary" type="submit">Register</button>
                    </li>  
                    <li>
                        <label />
                        <div>
                            Have an Buyer Account? {' '}
                            <Link to={`/signin?redirect=${redirect}`}>Buyer Sign-in</Link>
                        </div>
                        <div>
                            Buy on Bookify? {' '} Please {' '}
                            <Link to={`/register?redirect=${redirect}`}>Buyer Sign-up</Link>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
    )
}
