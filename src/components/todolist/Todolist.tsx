import React, {useCallback, useEffect} from "react";
import AddItemForm from "../addItemForm/AddItemForm";
import EditableSpan from "../editableSpan/EditableSpan";
import {Button, ButtonGroup, IconButton, List} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "../task/Task";
import {TaskStatuses, TaskType} from "../../api/todolist-task-api";
import {FilterValueType} from "../../state/todolist-reducer";
import {useDispatch} from "react-redux";
import {getTasksTC} from "../../state/tasks-reducer";


type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeTitle: (id: string, newTitle: string, todolistId: string) => void
    changeStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}


const Todolist = React.memo((props: PropsType) => {
    const dispatch=useDispatch()

    useEffect(()=>{
        const actionTC=getTasksTC(props.id)
        dispatch(actionTC)
    },[])

    const onClickStatusAll = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id])
    const onClickStatusActive = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id])
    const onClickStatusCompleted = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id])
    const removeTodolist = () =>{
        props.removeTodolist(props.id)
    }
    const addItem = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const onchangeTitle = useCallback((newTitle: string) =>{
        props.changeTodolistTitle(props.id, newTitle)
    } , [props.id, props.changeTodolistTitle])

    let taskForTodolist = props.tasks
    if (props.filter === "active") {
        taskForTodolist = props.tasks.filter(f => f.status===TaskStatuses.New)
    }
    if (props.filter === "completed") {
        taskForTodolist = props.tasks.filter(f => f.status===TaskStatuses.Completed)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={onchangeTitle}/>
                <IconButton color={"inherit"}>
                    <Delete onClick={() => {
                        removeTodolist()
                    }}/>
                </IconButton>
            </h3>
            <div>
                <AddItemForm addItem={addItem}/>
            </div>
            <List>
                {
                    taskForTodolist.map(m => {
                        return <Task removeTask={props.removeTask}
                                     changeStatus={props.changeStatus}
                                     changeTitle={props.changeTitle}
                                     todolistId={props.id}
                                     task={m}
                                     key={m.id}/>
                    })
                }
            </List>
            <div>
                <ButtonGroup variant={"outlined"}>
                    <Button color={props.filter === "all" ? "secondary" : "primary"} onClick={onClickStatusAll}>All
                    </Button>
                    <Button color={props.filter === "active" ? "secondary" : "primary"}
                            onClick={onClickStatusActive}>Active
                    </Button>
                    <Button color={props.filter === "completed" ? "secondary" : "primary"}
                            onClick={onClickStatusCompleted}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
})

export default Todolist;



