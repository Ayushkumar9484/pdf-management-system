import React, { useContext, useState } from 'react'
import "./style.css"
import { Link, useNavigate } from 'react-router-dom'
import { CurrentUser } from '../componenets/Usercontext'
import './style.css'


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
    fetch("http://localhost:5000/api/v1/auth/login", {
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
      {error && <h1>{error}</h1>}
      <div className=' signin-card'>
        <div className='login template d-flex justify-content-center align-items-center signin-card-inner' >
          <div className='form_container p-5 rounded bg-white main-card-signin'>
            <form onSubmit={handlesubmit}>
              <h3 className='text-center'>Sign In</h3>
              <div className='mb-2'>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' value={LoginDetails.email} placeholder='Enter Email' className='form-control' onChange={handlechanges} />
              </div>
              <div className='mb-2'>
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' value={LoginDetails.password} placeholder='Enter Password' className='form-control' onChange={handlechanges} />
              </div>
              <div className='mb-2'>
                <input type='checkbox' className='custom-control custom-checkbox' id='check' />
                <label htmlFor='check' className='custom-input-label ms-2'> Remember Me</label>
              </div>
              <div className='d-grid'>
                <button type='submit' className='btn btn-primary'>Sign In</button>
              </div>
              <p className='text-end mt-2'><Link to="/signup">Signup</Link></p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
