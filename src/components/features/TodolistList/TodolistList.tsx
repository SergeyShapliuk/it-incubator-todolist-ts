import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootStoreType} from "../../app/store";
import {
    ChangeFilterAC,
    changeTodolistTitleTC,
    createTodolistTC,
    deleteTodolistTC,
    FilterValueType,
    getTodolistTC,
    TodolistDomainType
} from "./Todolist/todolist-reducer";
import {createTasksTC, deleteTasksTC, initialTasksStateType, updateTaskTC} from "./Todolist/tasks-reducer";
import {TaskStatuses} from "../../../api/todolist-task-api";
import {Grid, Paper} from "@material-ui/core";
import AddItemForm from "../../addItemForm/AddItemForm";
import Todolist from "./Todolist/Todolist";


export const TodolistList: React.FC<PropsType> = ({demo=false}) => {
    const dispatch = useDispatch()
    const todolists = useSelector<RootStoreType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<RootStoreType, initialTasksStateType>(state => state.tasks)

    useEffect(() => {
        if(demo){
            return
        }else {
            const thunk = getTodolistTC()
            dispatch(thunk)
        }

    }, [])
    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(deleteTasksTC(id, todolistId))
        // let filteredTask = tasks[todolistId].filter(f => f.id !== id)
        // tasks[todolistId] = filteredTask
        // setTasks({...tasks})
    }, [])
    const changeFilter = useCallback((value: FilterValueType, todolistId: string) => {
        dispatch(ChangeFilterAC(value, todolistId))
        // let todolist = todolists.find(f => f.id === todolistId)
        // if (todolist) {
        //     todolist.filter = value
        //     setTodolists([...todolists])
        // }
    }, [])
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(createTasksTC(title, todolistId))
        // let newTask = {id: v1(), title: title, isDone: false}
        // tasks[todolistId] = [newTask, ...tasks[todolistId]]
        // setTasks({...tasks})
    }, [])
    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(id, {status}, todolistId))
        // let task = tasks[todolistId].find(f => f.id === id)
        // if (task) {
        //     task.isDone = isDone
        //     setTasks({...tasks})
        // }
    }, [])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolistTC(todolistId))
        // let todolist = todolists.filter(f => f.id !== todolistId)
        // setTodolists(todolist)
        // delete tasks[todolistId]
        // setTasks({...tasks})
    }, [])
    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
        // let newTodolist: TodolistType = {id: v1(), title: title, filter: "all"}
        // setTodolists([newTodolist, ...todolists])
        // setTasks({
        //     ...tasks,
        //     [newTodolist.id]: []
        // })
    }, [dispatch]);
    const changeTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(updateTaskTC(id, {title: newTitle}, todolistId))
        // let todolistTitle = tasks[todolistId].find(f => f.id === id)
        // if (todolistTitle) {
        //     todolistTitle.title = newTitle
        //     setTasks({...tasks})
        // }
    }, []);
    const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(id, newTitle))
        // let todolistTitle = todolists.find(f => f.id === id)
        // if (todolistTitle) {
        //     todolistTitle.title = newTitle
        //     setTodolists([...todolists])
        // }
    }, []);
    return (
        <>
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
                                    todolist={m}
                                    key={m.id}
                                    removeTask={removeTask}
                                    tasks={taskForTodolist}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeStatus={changeStatus}
                                    removeTodolist={removeTodolist}
                                    changeTitle={changeTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>
    )
}
type PropsType={
    demo?:boolean
}
type TodolistListPropsType = {}