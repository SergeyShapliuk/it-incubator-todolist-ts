import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskType} from '../../api/todolist-task-api';
import {TodolistList} from "../features/TodolistList/TodolistList";
import {LinearProgress} from "@mui/material";
import ErrorSnackbars from "../ErrorSnackBar/ErrorSnackBar";
import {useSelector} from "react-redux";
import {RootStoreType} from "./store";
import {RequestStatusType} from "./app-reducer/AppReducer";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../../features/login/Login";




function App({demo=false}:PropsType) {
const status=useSelector<RootStoreType,RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
            <ErrorSnackbars/>
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        News
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
                {status ==='loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={"/"} element={ <TodolistList demo={demo}/>}/>
                    <Route path={"/login"} element={ <Login/>}/>
                    <Route path={"/404"} element={ <h1>404. Page not found</h1>}/>
                    <Route path={"*"} element={ <Navigate to={"/404"}/>}/>
                </Routes>

            </Container>
        </div>
    );
}

export default App;


export type TasksStateType = {
    [key: string]: TaskType[]
}
type PropsType={
    demo?:boolean
}