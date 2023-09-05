import React from 'react'
import './App.css';
import Loginform from './components/loginform';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import MedicalRecord from './components/medicalrecord';
import Showdata from './components/Showdata';
import Medicalrecord from './components/medicalrecord';
import Appointmentrec from './components/appointmentrec';

export default function App() {
  return (
    <div className='page'>
      <Router>
      <div>
        <Routes>
          <Route path='/' exact Component={Home}/>
          <Route path='/register' exact Component={Register}/>
          <Route path='/login' exact Component={Loginform}/>
          <Route path='/medicalrec' exact Component={Medicalrecord}/>
        </Routes>
      </div>
    </Router>
    {/* <Medicalrecord/> */}
    {/* <Appointmentrec/> */}
    {/* <Showdata/> */}
    </div>
  )
}

