import axios, {AxiosResponse} from "axios";



const instant = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        'API-KEY': 'd63defdb-0459-40a2-9e7d-c1b6f429e0a6'
    }
});

export const todolistTaskApi = {
    getTodolist() {
        return instant.get<TodolistType[]>
        ('/todo-lists')
    },
    createTodolist(title: string) {
        return instant.post<{title:string},AxiosResponse<TodolistResponseType<{item: TodolistType }>>>
        ('/todo-lists', {title})
    },
    updateTodolist(todolistId: string, title: string) {
        return instant.put<{ title: string }, AxiosResponse<TodolistResponseType>>
        ('/todo-lists/' + todolistId, {title})
    },
    deleteTodolist(todolistId: string) {
        return instant.delete<TodolistResponseType>
        ('/todo-lists/' + todolistId)
    }
};
export const taskApi = {
    getTask(todolistId: string) {
        return instant.get<TaskResponseType>
        (`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string,title:string) {
        return instant.post<{ title: string }, AxiosResponse<TodolistResponseType<{ item: TaskType }>>>
        (`/todo-lists/${todolistId}/tasks`,{title})
    },
    updateTask(todolistId: string,taskId:string,model:UpdateTaskModelType) {
        return instant.put<UpdateTaskModelType, AxiosResponse<TodolistResponseType<{ item: TaskType }>>>
        (`/todo-lists/${todolistId}/tasks/${taskId}`,model)
    },
    deleteTask(todolistId: string,taskId:string) {
        return instant.delete<TodolistResponseType>
        (`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
};
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
};
type TodolistResponseType<D={}>={
    resultCode: number
    messages: string[]
    fieldsErrors: Array<string>
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
    status: TaskStatuses
    priority: TaskPriorities
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
export type UpdateTaskModelType={
    title: string
    description: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
};

