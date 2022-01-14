import React, {useEffect, useState} from 'react'
import {todolistApi} from "./todolist-api";


export default {
    title: 'API'
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
        todolistApi.getTodolist()
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
        todolistApi.createTodolist(title)
            .then(response=>setState(response))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId="a41f1c8e-6f5d-46bd-b7c0-c7fcd67c50fa"
        todolistApi.deleteTodolist(todolistId)
            .then(response=>setState(response))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId=''
        const title='second todolist'
        todolistApi.updateTodolist(todolistId,title)
            .then(response=>setState(response))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

