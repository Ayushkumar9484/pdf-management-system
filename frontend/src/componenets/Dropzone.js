import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export default function Dropzone({ className }) {
    const [files, setFiles] = useState([])
    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length) {
            setFiles((prev) => [
                ...prev,
                ...acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) }))
            ])
        }
    }, [])
    const removefile = (name) => {
        // setFiles(files => files.filter(file => file.name!==name))
        setFiles((files) => {
            return files.filter((file) => {
                return file.name !== name
            })
        })
    }
    const handlesubmit = async (e) => {
        e.preventDefault()
        const formdata = new FormData()
        files.forEach((file, index) => {
            formdata.append(`file${index}`, file);
          });
        formdata.append('token',window.localStorage.getItem("token"))
        fetch("http://localhost:5000/api/v1/pdf/save",{
            method:"POST",
            body:formdata
        })
        .then((res)=>res.json())
        .then((data) => {
            if (data.success === false) {
                console.log("Error : ", data.error)
              }
              else {
                console.log("PDF SAVED SUccesfully")
                console.log(data)
              }
        })

    }
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, accept: {
            'application/pdf': ['.pdf']
        }
    })

    return (
        <>
            {files && files.map((file) => {
                return (
                    <>
                        <p>{file.name}</p>
                        <button type='button' onClick={() => removefile(file.name)} >remove</button>
                    </>
                )
            })}
            {files && console.log(files)}
            <form  onSubmit={handlesubmit}>
                <div {...getRootProps({
                    className: className
                })}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                </div>
                {/* Preview  */}
                <div className='d-grid'>
                    <button type='submit' className='btn btn-primary mt-3'>Upload</button>
                </div>
            </form>
        </>
    )
}
