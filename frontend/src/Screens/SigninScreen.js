import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { signin } from '../actions/userAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function SigninScreen(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/'
    const userSignin = useSelector((state)=> state.userSignin)
    const {userInfo, loading, error} = userSignin

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(signin(email, password))
    }

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect)
        }
    }, [userInfo])

    return (
        <div className='form'>
            <form  onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h1 style={{fontWeight: 'bold', fontSize: '3rem'}}>Sign In</h1>
                    </li>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                    <li>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" placeholder="Enter Email" required onChange={e => setEmail(e.target.value)} />
                    </li>    
                    <li>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter Password" required onChange={e => setPassword(e.target.value)} />
                    </li>  
                    <li>
                        <label />
                        <button className="primary" type="submit">Sign In</button>
                    </li>  
                    <li>
                        <label />
                        <div>
                            New to Bookify? {' '}
                            <Link to={`/register?redirect=${redirect}`}>Create your Buyer account</Link>
                        </div>
                        <div>
                            Sell on Bookify? {' '}
                            <Link to={`/sellerRegister?redirect=${redirect}`}>Create your Seller account</Link>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
    )
}
