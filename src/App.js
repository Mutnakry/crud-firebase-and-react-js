import logo from './logo.svg';
import './App.css';
import Home from './page/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Write from './componenet/Write';
import Upload from './componenet/Upload';
import Book from './componenet/Book';
// import Getdata from './componenet/Getdata';
import { addDoc, collection, deleteDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import Edite from './componenet/Edite';
import Showimg from './componenet/Showimg';
import Testuploade from './componenet/Testuploade';
import Testshow from './componenet/Testshow';

import UploadImage from './componenet/Updateimg';
import Logingoogle from './page/signInWIthGoogle'
import Register from './page/register'
import Login from './page/login'
import Profile from './page/Profile'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from 'react';

import { auth } from './firebase';


import Product from './componenet/Product';
import ShowProduct from './componenet/ShowProduct'

function App() {

  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    })
  })
  return (
    <div >
      
      <BrowserRouter>
        <Routes>

          <Route path="/" element={user ? <Navigate to="/profile" /> : <Login />} />

          <Route path='/profile' Component={Profile}></Route>
          <Route path='/logingoodle' Component={Logingoogle}></Route>
          <Route path='/profile' Component={Profile}></Route>
          <Route path='/register' Component={Register}></Route>


          <Route path='/writh' Component={Write}></Route>
          <Route path='/upload' Component={Upload}></Route>
          <Route path='/UploadImage/:id' Component={UploadImage}></Route>
          <Route path='/img' Component={Showimg}></Route>
          <Route path='/book' Component={Book}></Route>
          <Route path='/b' Component={Book}></Route>
          <Route path='/edite/:id' Component={Edite}></Route>
          <Route path='/test' Component={Testuploade}></Route>
          <Route path='/showing' Component={Testshow}></Route>


          <Route path='/home' Component={Home}></Route>
          <Route path='/showproduct' Component={ShowProduct}></Route>
          <Route path='/product' Component={Product}></Route>

        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;


// https://youtu.be/zEdI9L1MZU8?si=IYvPdXIq0Nf0bGk1
