import {v1} from "uuid";
import {AddTodolistAC, RemoveTodolistAC} from "./todolist-reducer";
import {TasksStateType} from "../components/appWithRedux/AppWithRedux";


type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    id: string
    todolistId: string
}
type AddTasksActionType = {
    type: "ADD-TASK"
    title: string
    todolistId: string
}
type ChangeStatusActionType = {
    type: "CHANGE-STATUS"
    id: string
    isDone: boolean
    todolistId: string
}
type ChangeTitleActionType = {
    type: "CHANGE-TITLE"
    id: string
    newTitle: string
    todolistId: string
}


type ActionsTypes =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeStatusAC>
    | ReturnType<typeof changeTitleAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof RemoveTodolistAC>

const initialState:TasksStateType={

}

 export type initialTasksStateType=typeof initialState

const tasksReducer = (state: initialTasksStateType=initialState, action: ActionsTypes): initialTasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            // let filteredTask = state[action.todolistId].filter(f => f.id !== action.id)
            // state[action.todolistId] = filteredTask
            // return {...state}
            return {...state,[action.todolistId]:state[action.todolistId].filter(f=>f.id!==action.id)}
        }
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.title, isDone: false}
           // state[action.todolistId] = [newTask, ...state[action.todolistId]]
            return {...state,[action.todolistId]:[newTask,...state[action.todolistId]]}
        }
        case "CHANGE-STATUS": {
            // let task = state[action.todolistId].find(f => f.id === action.id)
            // if (task) {
            //     task.isDone = action.isDone
            // }
            return {...state,[action.todolistId]:state[action.todolistId].map(f=>f.id===action.id?{...f,isDone:action.isDone}:f)}
        }
        case "CHANGE-TITLE": {
            // let todolistTitle = state[action.todolistId].find(f => f.id === action.id)
            // if (todolistTitle) {
            //     todolistTitle.title = action.newTitle
            // }
            return {...state,[action.todolistId]:state[action.todolistId].map(f=>f.id===action.id?{...f,title:action.newTitle}:f)}
        }
        case "ADD-TODOLIST": {
            //state[action.todolistId] = []
            return {...state,[action.todolistId]:[]}
        }
        case "REMOVE-TODOLIST":{
           delete state[action.todolistId]
            return {...state}
        }


        default:
           return state;
    }
}
export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => ({
    type: "REMOVE-TASK",
    id, todolistId
}) as const
export const addTaskAC = (title: string, todolistId: string): AddTasksActionType => ({
    type: "ADD-TASK",
    title,
    todolistId
}) as const
export const changeStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeStatusActionType => ({
    type: "CHANGE-STATUS", id, isDone, todolistId
}) as const
export const changeTitleAC = (id: string, newTitle: string, todolistId: string): ChangeTitleActionType => ({
    type: "CHANGE-TITLE",
    id,
    newTitle,
    todolistId
}) as const
export default tasksReducer;