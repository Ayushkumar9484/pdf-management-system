import React, { useContext, useEffect, useState } from 'react'
import PdfStrip from '../componenets/pdfStrip'
// import Dropzone from '../componenets/Dropzone'
import Pdfinput from '../componenets/Pdfinput'
import { CurrentUser } from '../componenets/Usercontext'
import Navbar from '../componenets/Navbar'
import FrontPage from './FrontPage'
import Comment from '../componenets/Comment'

export default function Home() {
    // const [user,setUser] = useContext(CurrentUser)
    const { user, setUser } = useContext(CurrentUser)
    const [Data, setData] = useState('')
    const [currentComment,setCurreentComment] = useState("")

    const fetchdata = async () => {
        console.log("called dashboard")
        var token=localStorage.getItem("token")
        if(!token) return

        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/dashboard`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: localStorage.getItem("token")
            })
        })
        const json = await res.json()
        console.log(json)
        if (json.success === false) {
            return
        }
        setData(json.data)
        setUser({ name: json.name })
    }
    useEffect(() => {
        fetchdata()
    }, [])
    const updateHome = () => {
        console.log("Home updated simultaneously")
        fetchdata()
    }
    const updateCurrentComment = (filename) => {
        console.log("Update Comment")
        setCurreentComment(filename)
    }
    return (
        <>
            <Navbar updateHome={updateHome} />
            {
                user && user.name ?
                    <>
                        <div className='content-container shadow-lg p-2 m-4 rounded'>
                            <div className='m-3 p-1'>
                                {
                                    Data && Data.map((data,index) => {
                                        return <PdfStrip key={index} data={data} updateCurrentComment={updateCurrentComment}/>
                                    })

                                }
                            </div>
                            <Comment currentCommentPdf={currentComment}/>
                        </div>
                        {/* <Dropzone className="p-16 mt-10 border border-neutral-200"/> */}
                        <Pdfinput updateHome={updateHome} />
                    </> :
                    <>
                        <FrontPage />
                    </>
            }
        </>
    )
}
