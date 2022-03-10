import React, {useCallback} from "react";
import AddItemForm from "../../../addItemForm/AddItemForm";
import EditableSpan from "../../../editableSpan/EditableSpan";
import {Button, ButtonGroup, IconButton, List} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../../api/todolist-task-api";
import {FilterValueType, TodolistDomainType} from "./todolist-reducer";



type PropsType = {
    todolist:TodolistDomainType
    tasks: TaskType[]
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeTitle: (id: string, newTitle: string, todolistId: string) => void
    changeStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    demo?: boolean
}


const Todolist = React.memo(({demo = false, ...props}: PropsType) => {
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     if (demo) {
    //         return
    //     } else {
    //         const actionTC = getTasksTC(props.todolist.id)
    //         dispatch(actionTC)
    //     }
    //
    // }, [])

    const onClickStatusAll = useCallback(() =>
        props.changeFilter("all", props.todolist.id), [props.changeFilter, props.todolist.id])
    const onClickStatusActive = useCallback(() =>
        props.changeFilter("active", props.todolist.id), [props.changeFilter, props.todolist.id])
    const onClickStatusCompleted = useCallback(() =>
        props.changeFilter("completed", props.todolist.id), [props.changeFilter, props.todolist.id])
    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id)
    };
    const addItem = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])

    const onchangeTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.todolist.id, newTitle)
    }, [props.todolist.id, props.changeTodolistTitle])

    let taskForTodolist = props.tasks
    if (props.todolist.filter === "active") {
        taskForTodolist = props.tasks.filter(f => f.status === TaskStatuses.New)
    }
    if (props.todolist.filter === "completed") {
        taskForTodolist = props.tasks.filter(f => f.status === TaskStatuses.Completed)
    }
    return (
        <div>
            <h3><EditableSpan title={props.todolist.title} onChange={onchangeTitle}/>
                <IconButton color={"inherit"} disabled={props.todolist.entityStatus==="loading"}>
                    <Delete onClick={() => {
                        removeTodolist()
                    }}/>
                </IconButton>
            </h3>
            <div>
                <AddItemForm addItem={addItem} disabled={props.todolist.entityStatus==="loading"}/>
            </div>
            <List>
                {
                    taskForTodolist.map(m => {
                        return <Task removeTask={props.removeTask}
                                     changeStatus={props.changeStatus}
                                     changeTitle={props.changeTitle}
                                     todolistId={props.todolist.id}
                                     task={m}
                                     key={m.id}/>
                    })
                }
            </List>
            <div>
                <ButtonGroup variant={"outlined"}>
                    <Button color={props.todolist.filter === "all" ? "secondary" : "primary"} onClick={onClickStatusAll}>All
                    </Button>
                    <Button color={props.todolist.filter === "active" ? "secondary" : "primary"}
                            onClick={onClickStatusActive}>Active
                    </Button>
                    <Button color={props.todolist.filter === "completed" ? "secondary" : "primary"}
                            onClick={onClickStatusCompleted}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
})

export default Todolist;





