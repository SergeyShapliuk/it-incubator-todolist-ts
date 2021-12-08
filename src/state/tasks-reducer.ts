import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistAC, RemoveTodolistAC} from "./todolist-reducer";

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
type AddTodolistActionType = {}


type ActionsTypes =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeStatusAC>
    | ReturnType<typeof changeTitleAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof RemoveTodolistAC>

const tasksReducer = (state: TasksStateType, action: ActionsTypes): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let filteredTask = state[action.todolistId].filter(f => f.id !== action.id)
            state[action.todolistId] = filteredTask
            return {...state}
        }
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.title, isDone: false}
            state[action.todolistId] = [newTask, ...state[action.todolistId]]
            return {...state}
        }
        case "CHANGE-STATUS": {
            let task = state[action.todolistId].find(f => f.id === action.id)
            if (task) {
                task.isDone = action.isDone
            }
            return {...state}
        }
        case "CHANGE-TITLE": {
            let todolistTitle = state[action.todolistId].find(f => f.id === action.id)
            if (todolistTitle) {
                todolistTitle.title = action.newTitle
            }
            return {...state}
        }
        case "ADD-TODOLIST": {
            state[action.todolistId] = []
            return {...state}
        }
        case "REMOVE-TODOLIST":{
           delete state[action.todolistId]
            return {...state}
        }


        default:
            throw new Error("I don't understand this action type")
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