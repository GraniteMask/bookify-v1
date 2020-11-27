import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import {useDispatch, useSelector} from 'react-redux'
// import data from '../data'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsProduct } from '../actions/productAction';


export default function ProductScreen(props) {
    // const product = data.products.find(x => x._id === props.match.params.id)
    const userSignin = useSelector((state)=> state.userSignin)
    const {userInfo} = userSignin
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const productId = props.match.params.id
    const productDetails = useSelector(state=> state.productDetails)
    const {loading, error, product} = productDetails
    // if(!product){
    //     return <div>Product Not Found</div>
    // }

    useEffect(() => {
        dispatch(detailsProduct(productId))
    }, [dispatch, productId])

    const addToCartHandler = () =>{
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }

    return (
        <div>
          {loading ? (<LoadingBox></LoadingBox>)
          :
          error ? (<MessageBox variant="danger">{error}</MessageBox>)
          :
          (
            <div>
            <Link to='/'>Back to library</Link>
            <div className='row top'>
                <div className='col-2' style={{paddingRight: '15px'}}>
                    <img className='large' src={product.url} alt={product.name} />
                </div>
                <div className='col-1'>
                    <ul>
                        <li>
                            <h1>{product.name}</h1>
                        </li>
                        <li>
                            <Rating rating={product.rating}
                            numReviews = {product.numReviews}
                            />
                        </li>
                        <li>
                            <span style={{fontWeight: 'bold'}}>Price:</span> $ {product.price}
                        </li>
                        <li>
                            <span style={{fontWeight: 'bold'}}>Author:</span> {product.brand}
                        </li>
                        <li>
                            <span style={{fontWeight: 'bold'}}>Category:</span> {product.category}
                        </li>
                        
                        <li>
                            <span style={{fontWeight: 'bold'}}>Description:</span>
                            <p>{product.description}</p>
                        </li>
                        <li>
                            <span style={{fontWeight: 'bold'}}>Review feature is coming soon...Stay tuned!!!</span>
                        </li>
                    </ul>
                </div>
                <div className='col-1'>
                    <div className="card card-body">
                        <ul>
                            <li>
                                <div className='row'>
                                    <div>Price</div>
                                    <div className='price'>${product.price}</div>
                                </div>
                                
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Status</div>
                                    <div>
                                        {product.countInStock>0 ? (<span className="success">In Stock</span>)
                                        :
                                        (<span className="danger">Currently Unavailable</span>)
                                        }
                                    </div>
                                </div>
                            </li>
                            {
                                product.countInStock > 0 && (
                                    <>
                                        <li>
                                            <div className='row'>
                                                <div>Qty</div>
                                                <div>
                                                    <select value={qty} onChange={e=> setQty(e.target.value)}>
                                                        {
                                                            [...Array(product.countInStock).keys()].map(x=>(
                                                                <option key={x+1} value={x+1}>{x+1}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>  
                                        </li>
                                        <li>
                                            {userInfo && !userInfo.isAdmin &&(
                                                <button onClick={addToCartHandler} className='primary block'>Add to Cart</button>
                                            )}
                                        </li>
                                    </>
                                )
                            }
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
          )
          }
          
        </div>
        
    )
}
