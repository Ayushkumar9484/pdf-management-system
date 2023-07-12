import React, { useContext, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './component_stye.css'
import { CurrentUser } from '../componenets/Usercontext'


export default function PdfStrip(props) {
    pdfjs.GlobalWorkerOptions.workerSrc =
        `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const { commentOn, setCommentOn } = useContext(CurrentUser)
    const Addcomment = (e) => {
        e.preventDefault()
        setCommentOn(true)
        console.log(e.target.value)
        props.updateCurrentComment(e.target.value)
    }
    return (
        <>
            {/* <div className="card text-center cards" style={{ "width": "20rem", "margin": "20px" }}>
                <div className="card-body">
                    <h5 className="card-title bg position-relative h-40">{props.data.filename}</h5>
                </div>
                <div className='d-grid p-4'>
                    <a href={`${process.env.REACT_APP_PDF_PATH}${props.data.path}`} target='_blank'>
                        <button type='submit' className='btn btn-primary'>See PDF</button>
                    </a>
                </div> */}

            {/* Uncomment this to show pdf on same page */}
            {/* <Document className="" file={props.path} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} />
                    <p>
                        Page {pageNumber} of {numPages}
                    </p>
                </Document> */}
            {/* </div> */}

            <div className="rounded strips">
                <div>
                    <div className='strip-name'>
                        {props.data.filename}
                    </div>
                </div>
                <div className='strip-options'>
                    <div className='every-option'>
                        <a href={`${process.env.REACT_APP_PDF_PATH}${props.data.path}`} target='_blank'>
                            <button type='submit' className='btn btn-primary'>See PDF</button>
                        </a>
                    </div>
                    <div className='every-option'>
                        <button type='submit' className='btn btn-primary' onClick={Addcomment} value={props.data.filename}>Add comment</button>
                    </div>
                </div>
            </div>
        </>
    )
}
