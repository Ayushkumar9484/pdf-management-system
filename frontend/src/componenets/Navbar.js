import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import { CurrentUser } from './Usercontext'
import CoverPage_logo from '../images/CoverPage_logo.png'
import './component_stye.css'


export default function Navbar(props) {
    const { user } = useContext(CurrentUser)
    const updateAfterLogout = () => {
        props.updateHome()
    }
    return (
        <>
            <div className="d-flex justify-content-between bg-  m-2 border-bottom">
                <div className='m-2 p-2'>
                    <div className='h3'>
                        <img src={CoverPage_logo} width="60px" height="60px" />
                    </div>
                </div>
                <div className='bg- p-4 title'>
                    <h1>PDF MANAGEMENT SYSTEM</h1>
                </div>
                <div className="nav d-flex justify-content-end m-2 p-2 bg-light">
                    <nav >
                        <div className='container-fluid justify-content-center p-3'>
                        
                            {!user && <Link to="/login">
                                <button className="btn btn-outline-success me-2" type="button">Login</button>
                            </Link>}
                            {!user && <Link to="/signup">
                                <button className="btn btn-outline-success me-2" type="button">Sign Up</button>
                            </Link>}
                            {user && user.name && <Logout updateHome={updateAfterLogout} />}
                        </div>
                    </nav>
                </div>

            </div>
        </>
    )
}


