import React from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function Success(props) {
    return (
        <>
            {/* <div class="alert alert-success" role="alert">
                <h4 class="alert-heading">Well done!</h4>
                <p>{props.success}</p>
            </div> */}
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="success">{props.success}</Alert>
            </Stack>
        </>
    )
}
