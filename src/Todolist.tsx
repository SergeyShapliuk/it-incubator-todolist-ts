import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueType} from "./App";


type PropsTaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id:string
    title: string
    tasks: PropsTaskType[]
    removeTask: (id: string,todolistId:string) => void
    changeFilter: (value: FilterValueType,todolistId:string) => void
    addTask: (title: string,todolistId:string) => void
    changeStatus: (id: string, isDone: boolean,todolistId:string) => void
    filter:FilterValueType
    removeTodolist:(todolistId:string)=>void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState("")
    const [error,setError]=useState<string|null>(null)
    const addTask = () => {
        if(title.trim()!==""){
        props.addTask(title,props.id)
        setTitle("")
    }else {
            return setError("Title is required")
        }
    }


    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }
    const onClickStatusAll=() => props.changeFilter("all",props.id)
    const onClickStatusActive=() => props.changeFilter("active",props.id)
    const onClickStatusCompleted=() => props.changeFilter("completed",props.id)
    const removeTodolist=()=>props.removeTodolist(props.id)
    return (
        <div>
            <h3>{props.title}<button onClick={()=>{removeTodolist()}}>x</button></h3>
            <div>
                <input value={title} onChange={onChangeInputHandler}
                       onKeyPress={onKeyPressHandler}
                className={error?"error":""}/>
                <button onClick={addTask}>+</button>
                {error&&<div className={"error_message"}>{error}</div> }
            </div>
            <ul>
                {
                    props.tasks.map(m => {
                        const onClickHandler = () => {props.removeTask(m.id,props.id)}
                        const onChangeStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(m.id, e.currentTarget.checked,props.id)
                        }
                        return <li key={m.id} className={m.isDone?"is_done":""}><input type="checkbox" checked={m.isDone}
                                                     onChange={onChangeStatusHandler}
                        />
                            <span>{m.title}</span>
                            <button onClick={onClickHandler}>x
                            </button>
                        </li>
                    })
                }


            </ul>
            <div>
                <button className={props.filter==="all"?"active_filter":""} onClick={onClickStatusAll}>All</button>
                <button className={props.filter==="active"?"active_filter":""} onClick={onClickStatusActive}>Active</button>
                <button className={props.filter==="completed"?"active_filter":""} onClick={onClickStatusCompleted}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;