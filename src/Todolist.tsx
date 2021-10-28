import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";


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
                <button onClick={() => {
                    removeTodolist()
                }}>x
                </button>
            </h3>
            <div>
                <AddItemForm addItem={addItem}/>
            </div>
            <ul>
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
                        return <li key={m.id} className={m.isDone ? "is_done" : ""}><input type="checkbox"
                                                                                           checked={m.isDone}
                                                                                           onChange={onChangeStatusHandler}
                        />
                            <span><EditableSpan title={m.title} onChange={onChangeTitleHandler}/></span>
                            <button onClick={onClickHandler}>x
                            </button>
                        </li>
                    })
                }


            </ul>
            <div>
                <button className={props.filter === "all" ? "active_filter" : ""} onClick={onClickStatusAll}>All
                </button>
                <button className={props.filter === "active" ? "active_filter" : ""}
                        onClick={onClickStatusActive}>Active
                </button>
                <button className={props.filter === "completed" ? "active_filter" : ""}
                        onClick={onClickStatusCompleted}>Completed
                </button>
            </div>
        </div>
    )
}

export default Todolist;


