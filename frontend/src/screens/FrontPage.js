import React from 'react'
import Coverpage from '../images/Coverpage.jpg'
import "./style.css"
export default function FrontPage() {
    return (
        <>
            <div className="front_page_div">
                <img src={Coverpage} className="front_page_image" alt='FrontPage'/>
            </div>
        </>
    )
}
