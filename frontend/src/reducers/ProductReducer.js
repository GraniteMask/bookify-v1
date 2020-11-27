const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, FIND_BOOK_REQUEST, FIND_BOOK_SUCCESS, FIND_BOOK_FAIL } = require("../constants/ProductConstants");

export const productListReducer = (state={products:[], loading: true}, action) =>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {...state, loading: true}
        case PRODUCT_LIST_SUCCESS:
            return {...state, loading: false, products: action.payload}
        case PRODUCT_LIST_FAIL:
            return {...state, loading: false, error:action.payload}
        default:
            return state
    }
    
}

export const productDetailsReducer = (state= {product:{}, loading: true}, action)=>{
    switch (action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true}
        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false, product: action.payload}
        case PRODUCT_DETAILS_FAIL:
            return{loading:false, error: action.payload}
        default:
            return state
    }
}

export const productDeleteReducer = (state = {product: {}}, action)=>{
    switch (action.type){
        case PRODUCT_DELETE_REQUEST:
            return {loading: true}
        
        case PRODUCT_DELETE_SUCCESS:
            return {loading: false, product:action.payload, success: true}
        
        case PRODUCT_DELETE_FAIL:
            return {loading: false, error: action.payload}
         
        default:
            return state
    } 
 }
 
export const productSaveReducer = (state = {product: {}}, action)=>{
    switch (action.type){
        case PRODUCT_SAVE_REQUEST:
            return {loading: true}
        
        case PRODUCT_SAVE_SUCCESS:
            return {loading: false, success: true, product:action.payload}

        case PRODUCT_SAVE_FAIL:
            return {loading: false, error: action.payload}
         
        default:
            return state
    } 
 }

export const findBookReducer = (state= {books: []}, action)=>{
    switch (action.type){
        case FIND_BOOK_REQUEST:
            return {loading: true}
        case FIND_BOOK_SUCCESS:
            return {loading: false, books: action.payload}
        case FIND_BOOK_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}