import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import {RootStoreType} from "../app/store";
import {setAppErrorAC} from "../app/app-reducer/AppReducer";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ErrorSnackbars() {
    //const [open, setOpen] = React.useState(false);
    const error = useSelector<RootStoreType,string|null>(state => state.app.error)
    const dispatch = useDispatch()


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
dispatch(setAppErrorAC(null))
        //setOpen(false);
    };

    const isOpen = error !== null
    return (

        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}