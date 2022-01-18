import axios from "axios";


const instant = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        'API-KEY': 'd63defdb-0459-40a2-9e7d-c1b6f429e0a6'
    }
});

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
};
type TodolistResponseType<D={}>={
    resultCode: number
    messages: string[]
    data: D
};
export enum TaskStatuses{
    New,
    InProgress,
    Completed,
    Draft
}
export enum TaskPriorities{
    Low,
    Middle,
    Hi,
    Urgently,
    Later

}
export type TaskType={
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
};
type TaskResponseType={
    error:string|null
    totalCount:number
    items:TaskType[]
};
type CreateTaskType={
    resultCode: number
    messages: string[]
    data:{
        item:TaskType
    }


};
export type UpdateTaskType={
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
};
type DeleteTaskType={
    resultCode: number
    messages: string[]
    data: {}
}


export const todolistTaskApi = {
    getTodolist() {
        return instant.get<TodolistType[]>('/todo-lists')
            .then(response => response.data)
    },
    createTodolist(title: string) {
        return instant.post<TodolistResponseType>('/todo-lists', {title})
            .then(response => response.data)
    },
    updateTodolist(todolistId: string, title: string) {
        return instant.put<TodolistResponseType>('/todo-lists/' + todolistId, {title})
            .then(response => response.data)
    },
    deleteTodolist(todolistId: string) {
        return instant.delete<TodolistResponseType>('/todo-lists/' + todolistId)
            .then(response => response.data)
    }
};


export const taskApi = {
    getTask(todolistId: string) {
        return instant.get<TaskResponseType>(`/todo-lists/${todolistId}/tasks`)
            .then(response => response.data)
    },
    createTask(todolistId: string,title:string) {
        return instant.post<CreateTaskType>(`/todo-lists/${todolistId}/tasks`,{title})
            .then(response => response.data)
    },
    updateTask(todolistId: string,taskId:string,model:UpdateTaskType) {
        return instant.put<UpdateTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`,{model})
            .then(response => response.data)
    },
    deleteTask(todolistId: string,taskId:string) {
        return instant.delete<DeleteTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
            .then(response => response.data)
    },
};

