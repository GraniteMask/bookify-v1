import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, listProducts, saveProduct } from '../actions/productAction'
import MessageBox from '../components/MessageBox'



function ProductsScreen(props){
    const [modalVisible, setModalVisible] = useState(false)
    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [url, setUrl] = useState('')
    const productList = useSelector(state=>state.productList)
    const {loading, products, error} = productList
    const productSave = useSelector(state=>state.productSave)
    const productDelete = useSelector(state=>state.productDelete)
    const {loading: loadingSave, success: successSave, error: errorSave} = productSave
    const dispatch = useDispatch()
    const {loading: loadingDelete, success: successDelete, error:errorDelete} = productDelete

    useEffect(()=>{
        if(successSave){
            setModalVisible(false)     
        }
        dispatch(listProducts()) // here only if delete or update operation is done then only refresh the screen
        return () =>{
            //
        }
    },[successSave])

    const uploadPic = () =>{
        const data = new FormData()   //to upload file, search in google by fetch file ad read in mozilla docs
        data.append("file", image)
        data.append("upload_preset", "insta-clone")
        data.append("cloud_name", "rd1")

        fetch("https://api.cloudinary.com/v1_1/rd1/image/upload", {
            method: "post",
            body: data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
            // console.log(data.url)
        })
        .catch(err=>{
            console.log(err)
        }) 
    }


    useEffect(()=>{
        dispatch(listProducts())
    },[successDelete])

    // useEffect(()=>{
    //     dispatch(saveProduct({_id: id, name, price, url, brand, category, countInStock, description}))
    // }, [url])

    // const postInfo = () =>{
    //     if(url){
    //         dispatch(saveProduct({_id: id, name, price, url, brand, category, countInStock, description}))
    //     }
    // }
    const uploadPicHandler = () =>{
        uploadPic() 
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        // uploadPic() 
        // postInfo() 
        if(url){
            dispatch(saveProduct({_id: id, name, price, url, brand, category, countInStock, description}))
        }
    }

    const deleteHandler = (product) =>{
        dispatch(deleteProduct(product._id))
    }

    const openModal = (product)=>{
        setModalVisible(true)
        setId(product._id)
        setName(product.name)
        setPrice(product.price)
        // setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
        
    }


    return <div className="content content-margined">
        <div className="product-header">
            <h3>Products</h3>
            <button className="button primary" onClick={()=>openModal({})}>Create Product</button>
        </div>
        {modalVisible && 
        
        <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>
                        Create Product
                    </h2>
                </li>
                <li>
                    {loadingSave && <div>Loading...</div>}
                    {errorSave && <div>{errorSave}</div>}
                </li>
                <li>
                    <label htmlFor="name" style={{fontWeight: 'bold'}}>
                        Name
                    </label>
                    <input type="text" name="name" id="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="price" style={{fontWeight: 'bold'}}>
                        Price
                    </label>
                    <input type="text" name="price" id="price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                </li>
                <li>
                <div className="file-field input-field">
                    <div className="btn #64b5f6 blue lighten-2">
                        <span style={{fontWeight: 'bold'}}>Upload Book Cover</span>
                        <input type="file" 
                        onChange={(e)=>setImage(e.target.files[0])}
                        />
                    </div>
                </div>
                <div>
                    <button onClick={uploadPicHandler}>Upload Image</button>
                    {url? <MessageBox>Image is Uploaded</MessageBox>: <MessageBox>Click the upload button and please wait till image is uploaded</MessageBox>}
                </div>
                </li>
                <li>
                    <label htmlFor="brand" style={{fontWeight: 'bold'}}>
                        Author
                    </label>
                    <input type="text" name="author" id="author" value={brand} onChange={(e)=>setBrand(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="category" onChange={(e)=>setCategory(e.target.value)} >
                        <span style={{fontWeight: 'bold'}}>Category</span> [options (only one) - Science, Astronomy, Horror, Fiction, Detective, Biography, Self Improvement]
                    </label>
                    <input type="text" name="category" id="category" value={category} onChange={(e)=>setCategory(e.target.value)}/>
                    
                </li>
                <li>
                    <label htmlFor="inStocks" style={{fontWeight: 'bold'}}>
                        In Stocks
                    </label>
                    <input type="text" name="inStocks" value={countInStock} id="inStocks" onChange={(e)=>setCountInStock(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="description" style={{fontWeight: 'bold'}}>
                        Description
                    </label>
                    <textarea type="text" name="description" value={description} id="description" onChange={(e)=>setDescription(e.target.value)}></textarea>
                </li>
                <li>
                    <button type="submit" className="button primary">{id ? "Update" : "Create"}</button>
                </li>
                <li>
                    <button type="button" onClick={()=>setModalVisible(false)} className="button secondary">Back</button>
                </li>
            </ul>
        </form>
    </div>

        }
        
        <div className="product-list">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product=>(
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <button className="button" onClick={()=>openModal(product)}>Edit</button>
                                {' '}
                                <button className="button" onClick={()=>deleteHandler(product)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    </div>
    
    
    
}

export default ProductsScreen