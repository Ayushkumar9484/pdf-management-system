import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'


export default function Signup() {
  const navigate = useNavigate()
  const [SignUpDetails, SetSignUpDetails] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: ""
  })
  const handlechanges = (e) => {
    const { name, value } = e.target
    SetSignUpDetails((prev) => ({
      ...prev, [name]: value
    }))
  }
  const handlesubmit = (e) => {
    e.preventDefault()
    fetch("http://localhost:5000/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: SignUpDetails.name,
        email: SignUpDetails.email,
        password: SignUpDetails.password,
        reEnterPassword: SignUpDetails.reEnterPassword
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === false) {
          console.log("Error : ", data.error)
        }
        else {
          console.log("User Registered Successfully")
          navigate("/login")
        }
      })
  }
  return (
    <div className='signin-card'>
      <div className='signup template d-flex justify-content-center align-items-center signup-card-inner' >
        <div className='form_container p-5 rounded bg-white main-card-signup'>
          <form onSubmit={handlesubmit}>
            <h3 className='text-center'>Sign Up</h3>
            <div className='mb-2 '>
              <label htmlFor='name'>Name</label>
              <input type='text' name='name' value={SignUpDetails.name} placeholder='Enter Name' className='form-control w-100' onChange={(e) => handlechanges(e)} required />
            </div>
            <div className='mb-2'>
              <label htmlFor='email'>Email</label>
              <input type='email' name='email' value={SignUpDetails.email} placeholder='Enter Email' className='form-control' onChange={handlechanges} required />
            </div>
            <div className='mb-2'>
              <label htmlFor='password'>Password</label>
              <input type='password' name='password' value={SignUpDetails.password} placeholder='Enter Password' className='form-control' onChange={handlechanges} required />
            </div>
            <div className='mb-2'>
              <label htmlFor='password'>Confirm Password</label>
              <input type='password' name='reEnterPassword' value={SignUpDetails.reEnterPassword} placeholder='Enter Password' className='form-control' onChange={handlechanges} required />
            </div>
            <div className='mb-2'>
              <input type='checkbox' className='custom-control custom-checkbox' id='check' />
              <label htmlFor='check' className='custom-input-label ms-2'> Remember Me</label>
            </div>
            <div className='d-grid'>
              <button type='submit' className='btn btn-primary'>Sign Up</button>
            </div>
            <p className='text-end mt-2'>Already Registered? <Link to="/login">Sign In</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}
