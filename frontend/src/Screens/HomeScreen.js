// import Axios from 'axios';
import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
// import data from '../data'

export default function HomeScreen() {
  const productList = useSelector(state=> state.productList)
  const {loading, error, products} = productList
  const dispatch = useDispatch()

  useEffect(()=>{
    // const fetchData = async () =>{
    //   try{
    //     setLoading(true)
    //     const {data} = await Axios.get('/api/products')
    //     setLoading(false)
    //     setProducts(data)
    //   }
    //   catch(err){
    //     setError(err.message)
    //     setLoading(false)
    //   }
    // }
    // fetchData()

    dispatch(listProducts())
  },[])
    return (
        <div>
          {loading ? (<LoadingBox></LoadingBox>)
          :
          error ? (<MessageBox variant="danger">{error}</MessageBox>)
          :
          (<div className="row center">
          {
            // data.products.map(product=>(
            // < Product key={product._id} product={product} />
            // ))
            products.map(product=>(
              < Product key={product._id} product={product} />
              ))
          }        
          </div>)
          }
          
        </div>
    )
}
