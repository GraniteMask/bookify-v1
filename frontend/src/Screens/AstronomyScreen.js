import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findAstronomy } from '../actions/productAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import Product from '../components/Product'


export default function AstronomyScreen() {
    const findBook = useSelector(state=> state.findBook) 
    const {loading, error, books} = findBook
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(findAstronomy())
    },[])
    return (
        <div>
          {loading ? (<LoadingBox></LoadingBox>)
          :
          error ? (<MessageBox variant="danger">{error}</MessageBox>)
          :
          !books[0] ? <>No Books under this category are currently available. Please choose different category...</> :
          (<div className="row center">
          {
            books.map(book=>(
              < Product key={book._id} product={book} />
              ))
          }        
          </div>)
          }
           {!books && (
              <div>
                  No Books under this category are currently available. Please choose different category...
              </div>
          )}
        </div>
    )
}
