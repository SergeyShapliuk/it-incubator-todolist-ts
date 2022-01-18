import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import AddItemForm from "./components/addItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import Todolist from "./components/todolist/Todolist";
import {TodolistDomainType} from "./state/todolist-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from './api/todolist-task-api';


export type FilterValueType = "all" | "active" | "completed"


export type TasksStateType={
    [key:string]:TaskType[]
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<TodolistDomainType[]>([
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "",
            order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "",
            order: 0}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML", status:TaskStatuses.New,todoListId:todolistId1,description:"",startDate:"",deadline:"",addedDate:"",order:0, priority:TaskPriorities.Low,completed:false},
            {id: v1(), title: "CSS",status:TaskStatuses.New,todoListId:todolistId1,description:"",startDate:"",deadline:"",addedDate:"",order:0, priority:TaskPriorities.Low,completed:true},

        ],
        [todolistId2]: [
            {id: v1(), title: "CSS", status:TaskStatuses.New,todoListId:todolistId2,description:"",startDate:"",deadline:"",addedDate:"",order:0, priority:TaskPriorities.Low,completed:false},
            {id: v1(), title: "HTML", status:TaskStatuses.New,todoListId:todolistId2,description:"",startDate:"",deadline:"",addedDate:"",order:0, priority:TaskPriorities.Low,completed:true},

        ]
    })

    function removeTask(id: string, todolistId: string) {
        let filteredTask = tasks[todolistId].filter(f => f.id !== id)
        tasks[todolistId] = filteredTask
        setTasks({...tasks})

    }

    function changeFilter(value: FilterValueType, todolistId: string) {
        let todolist = todolists.find(f => f.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), title: title, status:TaskStatuses.New,todoListId:todolistId,description:"",startDate:"",deadline:"",addedDate:"",order:0, priority:TaskPriorities.Low,completed:false}
        tasks[todolistId] = [newTask, ...tasks[todolistId]]
        setTasks({...tasks})
    }

    function changeStatus(id: string, status:TaskStatuses, todolistId: string) {
        let task = tasks[todolistId].find(f => f.id === id)
        if (task) {
            task.status = status
            setTasks({...tasks})
        }


    }

    function removeTodolist(todolistId: string) {
        let todolist = todolists.filter(f => f.id !== todolistId)
        setTodolists(todolist)
        delete tasks[todolistId]
        setTasks({...tasks})

    }

    function addTodolist(title: string) {
        let newTodolist: TodolistDomainType = {id: v1(), title: title, filter: "all", addedDate: "",
            order: 0}
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks,
            [newTodolist.id]: []
        })


    }

    function changeTitle(id: string, newTitle: string, todolistId: string) {
        let todolistTitle = tasks[todolistId].find(f => f.id === id)
        if (todolistTitle) {
            todolistTitle.title = newTitle
            setTasks({...tasks})
        }

    }

    function changeTodolistTitle(id: string, newTitle: string) {
        let todolistTitle = todolists.find(f => f.id === id)
        if (todolistTitle) {
            todolistTitle.title = newTitle
            setTodolists([...todolists])
        }
    }

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
                <Grid container style={{padding:"10px"}}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((m) => {

                            let taskForTodolist = tasks[m.id]
                            if (m.filter === "active") {
                                taskForTodolist = tasks[m.id].filter(f => f.status)
                            }
                            if (m.filter === "completed") {
                                taskForTodolist = tasks[m.id].filter(f => !f.status)
                            }

                            return <Grid item >
                                <Paper style={{padding:"10px"}}>
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

export default App;




