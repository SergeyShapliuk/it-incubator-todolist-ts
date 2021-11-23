import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {Delete} from "@material-ui/icons";



type PropsTaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: PropsTaskType[]
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
    changeTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}


export function Todolist(props: PropsType) {


    const onClickStatusAll = () => props.changeFilter("all", props.id)
    const onClickStatusActive = () => props.changeFilter("active", props.id)
    const onClickStatusCompleted = () => props.changeFilter("completed", props.id)
    const removeTodolist = () => props.removeTodolist(props.id)
    const addItem = (title: string) => props.addTask(title, props.id)
    const onchangeTitle = (newTitle: string) => props.changeTodolistTitle(props.id, newTitle)


    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={onchangeTitle}/>
                <IconButton color={"inherit"}>
                    <Delete onClick={() => {removeTodolist()}}/>
                </IconButton>
            </h3>
            <div>
                <AddItemForm addItem={addItem}/>
            </div>
            <List>
                {
                    props.tasks.map(m => {
                        const onClickHandler = () => {
                            props.removeTask(m.id, props.id)
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(m.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (newTitle: string) => {
                            props.changeTitle(m.id, newTitle, props.id)
                        }
                        return <ListItem key={m.id} className={m.isDone ? "is_done" : ""}><Checkbox  defaultChecked color="primary"  checked={m.isDone}
                                                                                                    onChange={onChangeStatusHandler}/>


                            <span><EditableSpan title={m.title} onChange={onChangeTitleHandler}/></span>
                            <IconButton >
                                <Delete onClick={onClickHandler}/>
                            </IconButton>
                        </ListItem>
                    })
                }


            </List>
            <div>
                <ButtonGroup variant={"outlined"}>
                <Button color={props.filter === "all" ? "secondary" : "primary"} onClick={onClickStatusAll}>All
                </Button>
                <Button  color={props.filter === "active" ? "secondary"  :  "primary"}
                        onClick={onClickStatusActive}>Active
                </Button>
                <Button  color={props.filter === "completed" ? "secondary"  : "primary"}
                        onClick={onClickStatusCompleted}>Completed
                </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}

export default Todolist;


