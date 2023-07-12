import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CurrentUser } from './Usercontext'
export default function Logout(props) {
    const { user, setUser ,setCommentOn} = useContext(CurrentUser)
    const logout = () => {
        console.log("Logout called")
        localStorage.removeItem('token')
        setUser("")
        setCommentOn("")
        props.updateHome()
    }
    return (
        <>
            <div className='d-flex justify-content-end'>
                {<h6 className='m-2'> Welcome, {user && user.name ? user.name : null}</h6>}
                <Link to="/">
                    <button class="btn btn-outline-success me-2" type="button" onClick={logout}>Logout</button>
                </Link>
            </div>
        </>
    )
}
