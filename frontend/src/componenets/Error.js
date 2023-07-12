import React from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function Error(props) {
    return (
        // <div class="alert alert-danger" role="alert">
        //     {props.error}
        // </div>
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">{props.error}</Alert>
        </Stack>
    )
}
