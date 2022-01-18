import React, {useEffect, useState} from 'react'
import {taskApi} from "./todolist-task-api";




export default {
    title: 'API/TASK'
}
// const instant=axios.create({
//     withCredentials:true,
//     baseURL:'https://social-network.samuraijs.com/api/1.1',
//     headers:{
//         'API-KEY':'d63defdb-0459-40a2-9e7d-c1b6f429e0a6'
//     }
// })

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId="46f6c73b-6961-440e-86a6-60976039ee98"
        taskApi.getTask(todolistId)
            .then(response=>setState(response))
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId="46f6c73b-6961-440e-86a6-60976039ee98"
        const title='first task'
        taskApi.createTask(todolistId,title)
            .then(response=>setState(response))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId="46f6c73b-6961-440e-86a6-60976039ee98"
        const taskId="ebe482de-a36c-46c8-b008-2f7695116ddd"
        taskApi.deleteTask(todolistId,taskId)
            .then(response=>setState(response))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId="46f6c73b-6961-440e-86a6-60976039ee98"
        const taskId="ebe482de-a36c-46c8-b008-2f7695116ddd"
        const model={
            title: "",
            description: "",
            completed: false,
            status: 0,
            priority: 0,
            startDate: "",
            deadline: ""
        }
        taskApi.updateTask(todolistId,taskId,model)
            .then(response=>setState(response))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

