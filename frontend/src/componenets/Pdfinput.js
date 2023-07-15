import React, { useState } from 'react'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
import Error from './Error'
import Success from './Success'
import './component_stye.css'

export default function Pdfinput(props) {
    const [pdf, setpdf] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const pdfchanged = (e) => {
        console.log("pdf uploaded :", e.target.files[0])
        if (e.target.files[0].type !== "application/pdf") {
            e.target.value = ''
            setError("Only Pdf is allowed")
            return
        }
        if (e.target.files[0].name.length > 40) {
            e.target.value = ''
            setError("file name is too long")
            return
        }
        setError("")

        setpdf(e.target.files[0])
        console.log("PDF Succesfully updated on usestate variable")
    }
    const uploadPDF = async (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('mypdf', pdf)
        formdata.append('token', window.localStorage.getItem("token"))
        try {
            let response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/pdf/save`, formdata)
            console.log("THIS IS THE RESPONSE : ", response)
            if (response.data.success) {
                console.log("PDF UPLOADED SUCCESSFULLY")
                props.updateHome()
                setSuccess("Pdf Uploaded")
                setTimeout(() => {
                    console.log("Now remove success message")
                    setSuccess("")
                }, 5000)
            }
        } catch (err) {
            // console.log("This is the error",err.response.data.error)
            setError(`${err.response.data.error}`)
        }
    }
    return (
        <>
            <div className='upload_pdf_container'>
                <div className=" w-50">
                    <form onSubmit={uploadPDF}>
                        {success && <Success success={success} />}
                        {error && <Error error={error} />}
                        <div className='mb-3'>
                            <label className='form-label mt-4 pdf_input_text' >Upload Pdf</label>
                            <input type='file' className='form-control mt-2' name='mypdf' onChange={pdfchanged} required />
                        </div>
                        <div className='d-grid'>
                            <button type='submit' className='btn btn-primary m-2'>Upload PDF</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
