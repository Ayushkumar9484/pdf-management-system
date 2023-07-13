import React from 'react'

export default function CommentMessage(props) {
    return (
        <>
            <p className='comment-content'>
                {props.data.comment}
            </p>
        </>
    )
}
