import React, { useContext, useState,useEffect } from 'react'
import { motion } from 'framer-motion'
import { CurrentUser } from './Usercontext'
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import CommentMessage from './CommentMessage';

export default function Comment(props) {
    const { commentOn, setCommentOn } = useContext(CurrentUser)
    const [comment, setComment] = useState("");
    const [CommentData,SetCommentData]= useState(null)
    const UpdateComments = async () => {
        console.log("Update Comments Called")
        try{
            const res= await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/comment/Allcomments`,{
                method:'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    token:localStorage.getItem("token"),
                    filename:props.currentCommentPdf
                })
            })
            const Json_data=await res.json()
            console.log(Json_data.result)
            SetCommentData(Json_data.result)
        }catch(err)
        {
            console.log("ERROR : ",err)
        }
    }
    const Save_Comment = async (e) => {
        console.log("Save Comments Called")
        e.preventDefault()
        try{
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/comment/save`,{
                method:'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    token:localStorage.getItem("token"),
                    comment:comment,
                    pdfName:props.currentCommentPdf
                })
            });
            
            const Json_data =await response.json()
            console.log("JSON DATA : ",Json_data)
            setComment("")
            UpdateComments()
        }catch(err)
        {
            console.log("ERROR : ",err)
        }
    }
    useEffect(() => {
        UpdateComments()
    }, [props.currentCommentPdf])
    return (
        <>
            <motion.div className='comment shadow-lg p-3 mb-5 bg-white rounded' animate={{ opacity: commentOn ? 1 : 0 }}>
                <div className='comment-header'>
                    <div className='comment-header-text shadow p-3 mb-3 rounded'>
                        Comments
                    </div>
                    <div>
                        <button type='button' id='comment-close-button' onClick={() => {setCommentOn(false)}}><CloseIcon fontSize='large' /></button>
                    </div>
                </div>
                <div>
                    <p className="d-flex justify-content-center" style={{ borderBottom: '1px solid', paddingBottom: '5px' }}>{props.currentCommentPdf}</p>
                </div>
                <div className='main-section'>
                {
                    CommentData && CommentData.map((data,index) => {
                        return <CommentMessage data={data} />
                    })
                }
                </div>
                <div className='comment-send'>
                    <textarea class="form-control textarea-comment" placeholder="Write a Comment" type="text" rows="5" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    <button type='submit' id='comment-close-button' onClick={Save_Comment}><SendIcon fontSize='large' color='green' /></button>
                </div>
            </motion.div>
        </>
    )
}