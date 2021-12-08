import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";

const CHANGE_FILTER = "CHANGE-FILTER"
const REMOVE_TODOLIST = "REMOVE-TODOLIST"
const CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE"
const ADD_TODOLIST = "ADD-TODOLIST"

type ChangeFilterActionType = {
    type: "CHANGE-FILTER",
    value: FilterValueType,
    todolistId: string
}
type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    todolistId: string
}
type ChangeTodolistTitleActionType={
    type:"CHANGE-TODOLIST-TITLE",
    id:string,
    newTitle:string
}
type AddTodolistActionType={
    type:"ADD-TODOLIST",
    title:string
    todolistId:string
}


type ActionsTypes =
    ReturnType<typeof ChangeFilterAC>
    | ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof AddTodolistAC>

const todolistReducer = (state: TodolistType[], action: ActionsTypes): TodolistType[] => {
    switch (action.type) {
        case CHANGE_FILTER: {
            const todolist = state.find(f => f.id === action.todolistId)
            if (todolist) {
                todolist.filter = action.value
            }
            return [...state]
        }
        case REMOVE_TODOLIST: {
            return state.filter(f => f.id !== action.todolistId)
        }
        case CHANGE_TODOLIST_TITLE: {
            const todolistTitle = state.find(f => f.id === action.id)
            if (todolistTitle) {
                todolistTitle.title = action.newTitle
            }
            return [...state]
        }
        case ADD_TODOLIST: {
            const newTodolist: TodolistType = {id: action.todolistId, title: action.title, filter: "all"}
            return [newTodolist, ...state]
        }


        default:
            throw new Error("I don't understand this action type")
    }
}
export const ChangeFilterAC = (value: FilterValueType, todolistId: string):ChangeFilterActionType => ({
    type: CHANGE_FILTER,
    value, todolistId
}) as const
export const RemoveTodolistAC = (todolistId: string):RemoveTodolistActionType => ({type: REMOVE_TODOLIST, todolistId}) as const
export const ChangeTodolistTitleAC = (id: string, newTitle: string):ChangeTodolistTitleActionType => ({
    type: CHANGE_TODOLIST_TITLE,
    id,
    newTitle
}) as const
export const AddTodolistAC = (title: string):AddTodolistActionType => ({type: ADD_TODOLIST, title,todolistId:v1()}) as const
export default todolistReducer;