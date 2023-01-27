import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Pages/Login';
import Dashboard from './components/Pages/Dashboard/Dashboard';
// import Unit from './components/Pages/Unit/Unit';
// import Category from './components/Pages/Category/Category';
import Purchase from './components/Pages/Purchase/Purchase';
import Sale from './components/Pages/Sale/Sale';
import Product from './components/Pages/Product/Product';
import Report from './components/Pages/Report/Report';
import Logout from './components/Pages/Logout'; 
import Logina from './components/Pages/Logina/Logina';
import Register from './components/Pages/Register/Register';
import ForgotPassword from './components/Pages/ForgotPassword/ForgotPassword';
import Card from './components/Pages/Card/Card';
import AddDeleteableRows from './components/Pages/test/AddDeleteTableRows';
import '../src/components/Assets/sb-admin-2.css'; 

function App() { 
  return (
    <div className="App">      
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />}/>
        <Route exact path="/register" element={<Register />}/>
        <Route exact path="/forgotPassword" element={<ForgotPassword />}/>
        <Route exact path="/dashboard" element={<Dashboard />}/>
        {/* <Route exact path="/dashboard" element={<Dashboard />}/> */}
        {/* <Route exact path="/units" element={<Unit />}/>
        <Route exact path="/category" element={<Category />}/>
        <Route exact path="/units" element={<Unit />}/>
        <Route exact path="/units" element={<Unit />}/>*/}
        <Route exact path="/tr" element={<AddDeleteableRows />}/> 
        <Route exact path="/purchase" element={<Purchase />}/>
        <Route exact path="/sale" element={<Sale />}/>
        <Route exact path="/product" element={<Product />}/>
        <Route exact path="/report" element={<Report />}/>
        <Route exact path="/logout" element={<Logout />}/>
        <Route exact path="/logina" element={<Logina />}/>
        <Route exact path="/card" element={<Card />}/>

      </Routes>
    </Router>
    </div>
  )
}
export default App;
