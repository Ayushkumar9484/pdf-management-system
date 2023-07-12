import React from 'react'

export default function Comment_Message(props) {
    return (
        <>
            <p className='comment-content'>
                {props.data.comment}
            </p>
        </>
    )
}
