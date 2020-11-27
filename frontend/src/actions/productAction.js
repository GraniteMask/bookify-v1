import Axios from "axios"
import { FIND_BOOK_FAIL, FIND_BOOK_REQUEST, FIND_BOOK_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS } from "../constants/ProductConstants"

export const listProducts = () => async(dispatch)=>{
    dispatch({
        type: PRODUCT_LIST_REQUEST
    })
    try{
        const {data} = await Axios.get('/api/products')
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
    }catch(error){
        dispatch({type: PRODUCT_LIST_FAIL, payload:error.message})
    }
}

export const detailsProduct = (productId) => async(dispatch) =>{
    dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId})
    try{
        const {data} = await Axios.get(`/api/products/${productId}`)
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data})
    }catch(error){
        dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message
        })
    }
}

/* For seller account */

export const saveProduct = (product) => async (dispatch, getState) =>{
    try{
        dispatch({type: PRODUCT_SAVE_REQUEST, payload: product})
        const {userSignin:{userInfo}} = getState()
        if(!product._id){
            
            const {data} = await Axios.post('/api/products', product, {
                headers:{
                    'Authorization': 'Bearer ' + userInfo.token
                }
            })
            dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data})
            
        } else{
            const {data} = await Axios.put('/api/products/' + product._id, product, {
                headers:{
                    'Authorization': 'Bearer ' + userInfo.token
                }
            })
            dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data})
        }
    }catch(error){
        dispatch({type: PRODUCT_SAVE_FAIL, payload: error.message})
    }
}

export const deleteProduct = (productId) => async (dispatch, getState) =>{
    try{
        const {userSignin:{userInfo}} = getState()
        dispatch({type: PRODUCT_DELETE_REQUEST,payload: productId})
        const {data} = await Axios.delete("/api/products/" + productId,{
            header:{
                Authorization: 'Bearer ' + userInfo.token
            }
        })
        dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data, success: true});
    } catch(error){
        dispatch({type: PRODUCT_DELETE_FAIL, payload: error.message})
    }
}

export const findAstronomy = () => async(dispatch) =>{
    dispatch({type: FIND_BOOK_REQUEST})
    try{
        const {data} = await Axios.get("/api/products/findastronomy")
        dispatch({type: FIND_BOOK_SUCCESS, payload: data})
        // console.log(data)
    }catch(error){
        dispatch({type: FIND_BOOK_FAIL, payload: error.message})
    }
}

export const findScience = () => async(dispatch) =>{
    dispatch({type: FIND_BOOK_REQUEST})
    try{
        const {data} = await Axios.get("/api/products/findscience")
        dispatch({type: FIND_BOOK_SUCCESS, payload: data})
        // console.log(data)
    }catch(error){
        dispatch({type: FIND_BOOK_FAIL, payload: error.message})
    }
}

export const findHorror = () => async(dispatch) =>{
    dispatch({type: FIND_BOOK_REQUEST})
    try{
        const {data} = await Axios.get("/api/products/findhorror")
        dispatch({type: FIND_BOOK_SUCCESS, payload: data})
        // console.log(data)
    }catch(error){
        dispatch({type: FIND_BOOK_FAIL, payload: error.message})
    }
}

export const findBiography = () => async(dispatch) =>{
    dispatch({type: FIND_BOOK_REQUEST})
    try{
        const {data} = await Axios.get("/api/products/findbiography")
        dispatch({type: FIND_BOOK_SUCCESS, payload: data})
        // console.log(data)
    }catch(error){
        dispatch({type: FIND_BOOK_FAIL, payload: error.message})
    }
}

export const findDetective = () => async(dispatch) =>{
    dispatch({type: FIND_BOOK_REQUEST})
    try{
        const {data} = await Axios.get("/api/products/finddetective")
        dispatch({type: FIND_BOOK_SUCCESS, payload: data})
        // console.log(data)
    }catch(error){
        dispatch({type: FIND_BOOK_FAIL, payload: error.message})
    }
}

export const findFiction = () => async(dispatch) =>{
    dispatch({type: FIND_BOOK_REQUEST})
    try{
        const {data} = await Axios.get("/api/products/findfiction")
        dispatch({type: FIND_BOOK_SUCCESS, payload: data})
        // console.log(data)
    }catch(error){
        dispatch({type: FIND_BOOK_FAIL, payload: error.message})
    }
}

export const findSelfImprovement = () => async(dispatch) =>{
    dispatch({type: FIND_BOOK_REQUEST})
    try{
        const {data} = await Axios.get("/api/products/findSelfImprovement")
        dispatch({type: FIND_BOOK_SUCCESS, payload: data})
        // console.log(data)
    }catch(error){
        dispatch({type: FIND_BOOK_FAIL, payload: error.message})
    }
}