import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter, Link, Route} from 'react-router-dom'
import { signout } from './actions/userAction';
import AdminRoute from './components/AdminRoute';
import BuyerRoute from './components/BuyerRoute';
import PrivateRoute from './components/PrivateRoute';
import AstronomyScreen from './Screens/AstronomyScreen';
import CartScreen from './Screens/CartScreen';
import HomeScreen from './Screens/HomeScreen';
import orderHistoryScreen from './Screens/orderHistoryScreen';
import OrderScreen from './Screens/OrderScreen';
import PaymentMethodScreen from './Screens/PaymentMethodScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import ProductScreen from './Screens/ProductScreen';
import ProductsScreen from './Screens/ProductsScreen';
import ProfileScreen from './Screens/ProfileScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ScienceScreen from './Screens/ScienceScreen';
import HorrorScreen from './Screens/HorrorScreen';
import BiographyScreen from './Screens/BiographyScreen';
import DetectiveScreen from './Screens/DetectiveScreen';
import FictionScreen from './Screens/FictionScreen';
import SellerRegisterScreen from './Screens/SellerRegisterScreen';
import ShippingAddressScreen from './Screens/ShippingAddressScreen';
import SigninScreen from './Screens/SigninScreen';
import SelfImprovementScreen from './Screens/SelfImprovementScreen';



function App() {

  const cart = useSelector((state) => state.cart)
  const {cartItems} = cart    //cartItems: this name is similar as we defined in cartReducer
  const userSignin = useSelector((state)=> state.userSignin)
  const {userInfo} = userSignin
  const dispatch = useDispatch()
 
  const signoutHandler = () =>{
    dispatch(signout())
  }

  const openMenu = () =>{
    document.querySelector(".sidebar").classList.add("open")
  }
  const closeMenu = () =>{
    document.querySelector(".sidebar").classList.remove("open")
  }

  return( 
  <BrowserRouter>
  <div className="grid-container">
      <header className="row">
        <div>
          <button onClick={openMenu} style={{backgroundColor: 'black', color: 'white', fontWeight:'bolder', fontSize:'18px'}}>
           &#9776;
          </button>
          <Link className="brand" to="/" style={{margin: '4px'}}>Bookify</Link>
        </div>
        
        <div>
        {userInfo && !userInfo.isAdmin &&(
          <Link to="/cart">Cart
          {
            cartItems.length > 0 && (
              <span className='badge'>{cartItems.length} </span>
            )
          }
          </Link>
          )}
          
          {
            userInfo ? (
              <div className="dropdown">
                 <Link to="#">{userInfo.name} <i className='fa fa-caret-down'></i></Link>
                 <ul className="dropdown-content">
                   <li>
                     <Link to='/profile'>Update User Profile</Link>
                   </li>
                   {!userInfo.isAdmin ? (
                     <li>
                      <Link to='/orderhistory'>Order History</Link>
                      </li>)
                    :
                    <></>
                   }
                   
                   <li>
                    <Link to='/signin' onClick={signoutHandler}>Sign Out</Link>
                  </li>
                 </ul>
              </div>
            )
            :
            (
              <Link to="/signin">Sign In</Link>
            )  
          }
          {userInfo && userInfo.isAdmin && (
            <div className='dropdown'>
              <Link to='#admin'>
                Seller <i className='fa fa-caret-down'></i>
              </Link>
              <ul className='dropdown-content'>
                  {/* <li>
                    <Link to='/Dashboard'>Dashboard</Link>
                  </li> */}
                  <li>
                    <Link to='/products'>Products</Link>
                  </li>
              </ul>
            </div>
          )}
          
        </div>
      </header>
      <aside className="sidebar">
        <h3 style={{padding: '10px'}}>Book Categories</h3>
        <button className="sidebar-close-button" onClick={closeMenu}>x</button>
          <ul style={{padding: '10px'}}>
            <li>
              <a href="/astronomy">Astronomy</a>
            </li>
            <li>
              <a href="/science">Science</a>
            </li>
            <li>
              <a href="/horror">Horror</a>
            </li>
            <li>
              <a href="/biography">Biography</a>
            </li>
            <li>
              <a href="/detective">Detective</a>
            </li>
            <li>
              <a href="/fiction">Fiction</a>
            </li>
            <li>
              <a href="/selfImprovement">Self Improvement</a>
            </li>
          </ul>
      </aside>
      <main>
        <Route path="/" exact component={HomeScreen} />  
        {/* ? is used so that even when user go directly to /cart it shows it without adding new thing in it */}
        <Route path="/product/:id" component={ProductScreen} /> 
        <BuyerRoute path="/cart/:id?" component={CartScreen} />
        <Route path='/signin' component={SigninScreen} />
        <Route path='/register' component={RegisterScreen} />
        <Route path='/sellerRegister' component={SellerRegisterScreen} />
        <Route path='/shipping' component={ShippingAddressScreen} />
        <Route path='/payment' component={PaymentMethodScreen} />
        <Route path='/placeorder' component={PlaceOrderScreen} />
        <Route path='/order/:id' component={OrderScreen} />
        <BuyerRoute path='/orderhistory' component={orderHistoryScreen}/>
        <PrivateRoute path='/profile' component={ProfileScreen}/>
        <AdminRoute path='/products' component={ProductsScreen} />
        <Route path='/astronomy' component={AstronomyScreen} />
        <Route path='/science' component={ScienceScreen} />
        <Route path='/horror' component={HorrorScreen} />
        <Route path='/biography' component={BiographyScreen} />
        <Route path='/detective' component={DetectiveScreen} />
        <Route path='/fiction' component={FictionScreen} />
        <Route path='/selfImprovement' component={SelfImprovementScreen} />
        
      </main>
      <footer className="row center" >All right reserved 
      &copy; Ratnadeep Das Choudhury
      </footer>
    </div>
    </BrowserRouter>
  )
}

export default App;
