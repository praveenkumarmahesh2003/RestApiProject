import React from 'react'
import "./home.css"
import { Link } from 'react-router-dom';


export default function Home() {
  return (
    <div className='head'>
        <h1>Medical Record Management</h1>
        <nav >
            <ul  className='list'>
                <li><button><Link to="/login">Login</Link></button></li>
            
                <li><button><Link to="/register">Sign Up</Link></button></li>
                {/* Add other navigation links */}
            </ul>
        </nav>
        <div>
        {/* <button className='btn' onClick={handleclick}>Login/SignUp</button> */}
        </div>

    </div>
  )
}
