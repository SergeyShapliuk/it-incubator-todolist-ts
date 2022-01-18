import React, {useCallback} from 'react';
import '../../App.css';
import Todolist from "../todolist/Todolist";
import AddItemForm from "../addItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeFilterAC,
    ChangeTodolistTitleAC, FilterValueType,
    RemoveTodolistAC, TodolistDomainType
} from "../../state/todolist-reducer";
import {addTaskAC, changeStatusAC, changeTitleAC, initialTasksStateType, removeTaskAC} from "../../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStoreType} from "../../state/store";
import {TaskStatuses, TaskType} from '../../api/todolist-task-api';






export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<RootStoreType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<RootStoreType, initialTasksStateType>(state => state.tasks)


    const removeTask = useCallback((id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId)
        dispatch(action)
        // let filteredTask = tasks[todolistId].filter(f => f.id !== id)
        // tasks[todolistId] = filteredTask
        // setTasks({...tasks})
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValueType, todolistId: string) => {
        const action = ChangeFilterAC(value, todolistId)
        dispatch(action)
        // let todolist = todolists.find(f => f.id === todolistId)
        // if (todolist) {
        //     todolist.filter = value
        //     setTodolists([...todolists])
        // }
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId)
        dispatch(action)
        // let newTask = {id: v1(), title: title, isDone: false}
        // tasks[todolistId] = [newTask, ...tasks[todolistId]]
        // setTasks({...tasks})
    }, [dispatch])

    const changeStatus = useCallback((id: string, status:TaskStatuses, todolistId: string) => {
        const action = changeStatusAC(id, status, todolistId)
        dispatch(action)
        // let task = tasks[todolistId].find(f => f.id === id)
        // if (task) {
        //     task.isDone = isDone
        //     setTasks({...tasks})
        // }


    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        const action = RemoveTodolistAC(todolistId)
        dispatch(action)
        // let todolist = todolists.filter(f => f.id !== todolistId)
        // setTodolists(todolist)
        // delete tasks[todolistId]
        // setTasks({...tasks})

    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const action = AddTodolistAC(title)
        dispatch(action)
        // let newTodolist: TodolistType = {id: v1(), title: title, filter: "all"}
        // setTodolists([newTodolist, ...todolists])
        // setTasks({
        //     ...tasks,
        //     [newTodolist.id]: []
        // })


    }, [dispatch]);

    const changeTitle=useCallback((id: string, newTitle: string, todolistId: string)=> {
        const action = changeTitleAC(id, newTitle, todolistId)
        dispatch(action)
        // let todolistTitle = tasks[todolistId].find(f => f.id === id)
        // if (todolistTitle) {
        //     todolistTitle.title = newTitle
        //     setTasks({...tasks})
        // }

    },[dispatch]);

    const changeTodolistTitle=useCallback((id: string, newTitle: string)=> {
        const action = ChangeTodolistTitleAC(id, newTitle)
        dispatch(action)
        // let todolistTitle = todolists.find(f => f.id === id)
        // if (todolistTitle) {
        //     todolistTitle.title = newTitle
        //     setTodolists([...todolists])
        // }
    },[dispatch]);

    return (
        <div className="App">
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
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((m) => {
                            let taskForTodolist = tasks[m.id]

                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={m.id}
                                        id={m.id}
                                        title={m.title}
                                        removeTask={removeTask}
                                        tasks={taskForTodolist}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        filter={m.filter}
                                        removeTodolist={removeTodolist}
                                        changeTitle={changeTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;




