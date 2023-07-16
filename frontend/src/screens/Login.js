import React, { useContext, useState } from 'react'
import "./style.css"
import { Link, useNavigate } from 'react-router-dom'
import { CurrentUser } from '../componenets/Usercontext'
import './style.css'
import LoginImage from '../images/LoginPageImage.png'
import Error from '../componenets/Error'


export default function Login() {
  const navigate = useNavigate()
  const { setUser } = useContext(CurrentUser)
  const [LoginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")
  const handlechanges = (e) => {
    const { name, value } = e.target
    setLoginDetails((prev) => ({
      ...prev, [name]: value
    }))
  }

  const handlesubmit = (e) => {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: LoginDetails.email,
        password: LoginDetails.password
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === false) {
          console.log("Error : ", data.error)
          setError(data.error)
        }
        else {
          console.log("Login SUccesfully")
          localStorage.setItem('token', data.token); //store token in local storage for
          console.log(data)
          setUser({ name: data.name })
          navigate("/")
        }
      })
  }

  return (
    <>
      {error && <Error error={error}/>}
      <div className='signin-card-outer 100vh'>
        <div className=' signin-card'>
          <div className='login template d-flex rounded-4 signin-card-inner' >
            <div className='image-container-signin rounded-4'>
              <img src={LoginImage} width='500px' height='500px' alt='Login' />
            </div>
            <div className='main-card-sighin-outer rounded-4'>
            
              <div className='form_container p-5 rounded main-card-signin'>
                <form onSubmit={handlesubmit}>
                  <h3 className='text-center' style={{fontFamily: "Gill Sans Extrabold"}}>Sign In</h3>
                  <div className='mb-2'>
                    <label htmlFor='email' style={{fontFamily: "Gill Sans Extrabold"}}>Email</label>
                    <input type='email' name='email' value={LoginDetails.email} placeholder='Enter Email' className='form-control' onChange={handlechanges} />
                  </div>
                  <div className='mb-2 mt-2'>
                    <label htmlFor='password' style={{fontFamily: "Gill Sans Extrabold"}}>Password</label>
                    <input type='password' name='password' value={LoginDetails.password} placeholder='Enter Password' className='form-control' onChange={handlechanges} />
                  </div>
                  {/* <div className='mb-2'>
                    <input type='checkbox' className='custom-control custom-checkbox' id='check' />
                    <label htmlFor='check' className='custom-input-label ms-2'> Remember Me</label>
                  </div> */}
                  <div className='d-grid'>
                    <button type='submit' className='btn btn-primary mt-2'  style={{fontFamily: "Gill Sans Extrabold",backgroundColor:"#6a378a"}}>Sign In</button>
                  </div>
                  <p className='text-end mt-2'><Link to="/signup" style={{fontFamily: "Gill Sans Extrabold"}}>Signup</Link></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
