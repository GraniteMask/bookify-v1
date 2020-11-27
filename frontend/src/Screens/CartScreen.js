import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/CartAction'
import MessageBox from '../components/MessageBox'

function CartScreen(props) {
    const productId = props.match.params.id
    const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1
    const dispatch = useDispatch()
    const cart = useSelector((state)=> state.cart)
    const {cartItems} = cart

    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) =>{
        //delete
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = () =>{
        props.history.push('/signin?redirect=shipping')
    }

    return (
        <div className="row top">
            <div className="col-2">
                <h1>Your Shopping Cart</h1>
                {cartItems.length === 0?( <MessageBox>
                    Cart is Empty. <Link to='/'>Shop now</Link>
                </MessageBox>)
                :
                (<ul>
                    {
                        cartItems.map((item) => (
                            <li key={item.product}>
                                <div className="row">
                                    <div>
                                        <img 
                                        src={item.url}
                                        alt={item.name}
                                        className="small" />
                                    </div>
                                    <div className="min-30">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>
                                    <div>
                                        <select value={item.qty} onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                        {
                                            [...Array(item.countInStock).keys()].map(x=>(
                                                <option key={x+1} value={x+1}>{x+1}</option>
                                            ))
                                        }  
                                        </select>
                                    </div>
                                    <div>
                                        <div>${item.price}</div>
                                    </div>
                                    <div>
                                        <button type="button" onClick={()=> removeFromCartHandler(item.product)}>Delete</button>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>)
                }
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                SubTotal ({cartItems.reduce((a,c) => a + c.qty, 0)} items) : ${cartItems.reduce((a,c) => a + c.price*c.qty, 0)} 
                            </h2>
                        </li>
                        <li>
                            <button type="button" onClick={checkOutHandler} className="primary block" disabled={cartItems.length === 0}>
                                Checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CartScreen
