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
                <TodolistList demo={demo}/>
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