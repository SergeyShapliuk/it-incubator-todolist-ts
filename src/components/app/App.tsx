import React, {useEffect} from 'react';
import './App.css';
import {AppBar, Button, CircularProgress, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskType} from '../../api/todolist-task-api';
import {TodolistList} from "../features/TodolistList/TodolistList";
import {LinearProgress} from "@mui/material";
import ErrorSnackbars from "../ErrorSnackBar/ErrorSnackBar";
import {RootStoreType} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer/AppReducer";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../../features/login/Login";
import {logoutTC} from "../../features/login/auth-reducer";
import {useDispatch, useSelector} from "react-redux";


function App({demo = false}: PropsType) {

    const status = useSelector<RootStoreType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<RootStoreType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<RootStoreType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>

    }
    const logoutHandler = () => {
        dispatch(logoutTC())
    }
    return (
        <div className="App">
            <ErrorSnackbars/>
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        To-do list
                    </Typography>
                    {
                        isLoggedIn && <Button color={"inherit"} onClick={logoutHandler}>Log out</Button>
                    }
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={"/"} element={<TodolistList demo={demo}/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    {/*<Route path={"/404"} element={<h1>404. Page not found</h1>}/>*/}
                    <Route path={"*"} element={<Navigate to={"/"}/>}/>
                </Routes>

            </Container>
        </div>
    );
}

export default App;


export type TasksStateType = {
    [key: string]: TaskType[]
}
type PropsType = {
    demo?: boolean
}