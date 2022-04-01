import axios, {AxiosResponse} from "axios";



const instant = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        'API-KEY': '4b750f58-1048-4ae6-9514-873b7e78e720'
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
    createTask(title:string,todolistId: string) {
        return instant.post<{ title: string }, AxiosResponse<TodolistResponseType<{ item: TaskType }>>>
        (`/todo-lists/${todolistId}/tasks`,{title})
    },
    updateTask(todolistId: string,taskId:string,model:UpdateTaskModelType) {
        return instant.put<UpdateTaskModelType, AxiosResponse<TodolistResponseType<{ item: TaskType }>>>
        (`/todo-lists/${todolistId}/tasks/${taskId}`,model)
    },
    deleteTask(taskId:string,todolistId: string) {
        return instant.delete<TodolistResponseType>
        (`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
};
export const authApi={
    login(data:LoginRequestType){
        return instant.post<LoginRequestType,AxiosResponse<TodolistResponseType<{userId:number}>>>('/auth/login',data)
    },
    me(){
        return instant.get<TodolistResponseType<DataAuthResponseType>>('/auth/me')
    },
    logout(){
        return instant.delete<TodolistResponseType>('/auth/login')
    }

};
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
};
export type FieldErrorType={field:string,error:string}
export type TodolistResponseType<D={}>={
    resultCode: number
    messages: string[]
    fieldsErrors?: Array<FieldErrorType>
    data: D
};
export type LoginRequestType={
    email:string
    password:string
    rememberMe?:boolean
    captcha?:string
}
type DataAuthResponseType={
    userId:number
    email:string
    login:string
}

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

