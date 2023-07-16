import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import SignUpImage from '../images/SignUpPageImage.jpg'
import Error from '../componenets/Error'


export default function Signup() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
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
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/register`, {
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
          if(data.error === 'Duplicate field value enetered')
          setError("Already Registered")
          else setError(data.error)
        }
        else {
          console.log("User Registered Successfully")
          navigate("/login")
        }
      })
  }
  return (
    <>
    {error && <Error error={error}/>}
      <div className='signup-card-outer 100vh'>
        <div className='signin-card'>
          <div className='signup template d-flex rounded-4 signup-card-inner'>
            <div className='main-card-sighup-outer rounded-4'>
              <div className='form_container p-5 rounded bg-white main-card-signup'>
                <form onSubmit={handlesubmit}>
                  <h3 className='text-center' style={{fontFamily: "Gill Sans Extrabold"}}>Sign Up</h3>
                  <div className='mb-2 '>
                    <label htmlFor='name' style={{fontFamily: "Gill Sans Extrabold"}}>Name</label>
                    <input type='text' name='name' value={SignUpDetails.name} placeholder='Enter Name' className='form-control w-100' onChange={(e) => handlechanges(e)} required />
                  </div>
                  <div className='mb-2'>
                    <label htmlFor='email'style={{fontFamily: "Gill Sans Extrabold"}}>Email</label>
                    <input type='email' name='email' value={SignUpDetails.email} placeholder='Enter Email' className='form-control' onChange={handlechanges} required />
                  </div>
                  <div className='mb-2'>
                    <label htmlFor='password' style={{fontFamily: "Gill Sans Extrabold"}}>Password</label>
                    <input type='password' name='password' value={SignUpDetails.password} placeholder='Enter Password' className='form-control' onChange={handlechanges} required />
                  </div>
                  <div className='mb-2'>
                    <label htmlFor='password' style={{fontFamily: "Gill Sans Extrabold"}}>Confirm Password</label>
                    <input type='password' name='reEnterPassword' value={SignUpDetails.reEnterPassword} placeholder='Enter Password' className='form-control' onChange={handlechanges} required />
                  </div>
                  {/* <div className='mb-2'>
                    <input type='checkbox' className='custom-control custom-checkbox' id='check' />
                    <label htmlFor='check' className='custom-input-label ms-2'> Remember Me</label>
                  </div> */}
                  <div className='d-grid'>
                    <button type='submit' className='btn btn-primary' style={{fontFamily: "Gill Sans Extrabold"}}>Sign Up</button>
                  </div>
                  <p className='text-end mt-2' style={{fontFamily: "Gill Sans Extrabold"}}>Already Registered? <Link to="/login" >Sign In</Link></p>
                </form>
              </div>
            </div>
            <div className='image-container-signup rounded-4'>
              <img src={SignUpImage} width='500px' height='500px' alt='Signup' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
