import React, {useEffect, useState} from 'react'
import {todolistTaskApi} from "./todolist-task-api";


export default {
    title: 'API/TODOLIST'
}
// const instant=axios.create({
//     withCredentials:true,
//     baseURL:'https://social-network.samuraijs.com/api/1.1',
//     headers:{
//         'API-KEY':'d63defdb-0459-40a2-9e7d-c1b6f429e0a6'
//     }
// })

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistTaskApi.getTodolist()
            .then(response=>setState(response))
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title='first todolist'
        todolistTaskApi.createTodolist(title)
            .then(response=>setState(response))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId="46f6c73b-6961-440e-86a6-60976039ee98"
        todolistTaskApi.deleteTodolist(todolistId)
            .then(response=>setState(response))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId=''
        const title='second todolist'
        todolistTaskApi.updateTodolist(todolistId,title)
            .then(response=>setState(response))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

