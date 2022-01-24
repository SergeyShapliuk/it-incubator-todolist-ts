import React, {useCallback, useEffect} from 'react';
import '../../App.css';
import Todolist from "../todolist/Todolist";
import AddItemForm from "../addItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    ChangeFilterAC,
    changeTodolistTitleTC, createTodolistTC, deleteTodolistTC, FilterValueType, getTodolistTC,
    TodolistDomainType
} from "../../state/todolist-reducer";
import {
    createTasksTC, deleteTasksTC,
    initialTasksStateType, updateTaskTC,
} from "../../state/tasks-reducer";
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

    useEffect(() => {
        dispatch(getTodolistTC())
    }, [])

    const removeTask = useCallback((id: string, todolistId: string) => {
        const actionTC = deleteTasksTC(id, todolistId)
        dispatch(actionTC)
        // let filteredTask = tasks[todolistId].filter(f => f.id !== id)
        // tasks[todolistId] = filteredTask
        // setTasks({...tasks})
    }, [])

    const changeFilter = useCallback((value: FilterValueType, todolistId: string) => {
        const action = ChangeFilterAC(value, todolistId)
        dispatch(action)
        // let todolist = todolists.find(f => f.id === todolistId)
        // if (todolist) {
        //     todolist.filter = value
        //     setTodolists([...todolists])
        // }
    }, [])

    const addTask = useCallback((title: string, todolistId: string) => {
        const actionTC = createTasksTC(title, todolistId)
        dispatch(actionTC)
        // let newTask = {id: v1(), title: title, isDone: false}
        // tasks[todolistId] = [newTask, ...tasks[todolistId]]
        // setTasks({...tasks})
    }, [])

    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        const actionTC = updateTaskTC(id, {status}, todolistId)
        dispatch(actionTC)
        // let task = tasks[todolistId].find(f => f.id === id)
        // if (task) {
        //     task.isDone = isDone
        //     setTasks({...tasks})
        // }


    }, [])

    const removeTodolist = useCallback((todolistId: string) => {
        const actionTC = deleteTodolistTC(todolistId)
        dispatch(actionTC)
        // let todolist = todolists.filter(f => f.id !== todolistId)
        // setTodolists(todolist)
        // delete tasks[todolistId]
        // setTasks({...tasks})

    }, [])

    const addTodolist = useCallback((title: string) => {
        const actionTC = createTodolistTC(title)
        dispatch(actionTC)
        // let newTodolist: TodolistType = {id: v1(), title: title, filter: "all"}
        // setTodolists([newTodolist, ...todolists])
        // setTasks({
        //     ...tasks,
        //     [newTodolist.id]: []
        // })


    }, [dispatch]);

    const changeTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        console.log(newTitle)
        const actionTC = updateTaskTC(id, {title: newTitle}, todolistId)
        dispatch(actionTC)
        // let todolistTitle = tasks[todolistId].find(f => f.id === id)
        // if (todolistTitle) {
        //     todolistTitle.title = newTitle
        //     setTasks({...tasks})
        // }

    }, []);

    const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
        const actionTC = changeTodolistTitleTC(id, newTitle)
        dispatch(actionTC)
        // let todolistTitle = todolists.find(f => f.id === id)
        // if (todolistTitle) {
        //     todolistTitle.title = newTitle
        //     setTodolists([...todolists])
        // }
    }, [dispatch]);

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




