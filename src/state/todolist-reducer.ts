import {todolistTaskApi, TodolistType} from "../api/todolist-task-api";
import {Dispatch} from "redux";


const CHANGE_FILTER = "CHANGE-FILTER"
const REMOVE_TODOLIST = "REMOVE-TODOLIST"
const CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE"
const ADD_TODOLIST = "ADD-TODOLIST"
const GET_TODOLIST = "GET-TODOLIST"

type ChangeFilterActionType = {
    type: "CHANGE-FILTER",
    value: FilterValueType,
    todolistId: string
}
type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    todolistId: string
}
type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string,
    newTitle: string
}
type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    todolist: TodolistType
}


type ActionsTypes =
    ReturnType<typeof ChangeFilterAC>
    | ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof GetTodolistAC>

export type FilterValueType = "all" | "active" | "completed"

const initialState: TodolistDomainType[] = []

export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
}
export type InitialTodolistStateType = typeof initialState

const todolistReducer = (state: InitialTodolistStateType = initialState, action: ActionsTypes): InitialTodolistStateType => {
    switch (action.type) {
        case CHANGE_FILTER: {
            // const todolist = state.find(f => f.id === action.todolistId)
            // if (todolist) {
            //     todolist.filter = action.value
            // }
            return [...state.map(m => m.id === action.todolistId ? {...m, filter: action.value} : m)]
        }
        case REMOVE_TODOLIST: {
            return [...state.filter(f => f.id !== action.todolistId)]
        }
        case CHANGE_TODOLIST_TITLE: {
            // const todolistTitle = state.find(f => f.id === action.id)
            // if (todolistTitle) {
            //     todolistTitle.title = action.newTitle
            // }
            return [...state.map(m => m.id === action.id ? {...m, title: action.newTitle} : m)]
        }
        case ADD_TODOLIST: {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: "all"}
            return [newTodolist, ...state]
        }
        case GET_TODOLIST: {
            return action.todolists.map(tl => {
                    return {...tl, filter: "all"}
                }
        )
        }


        default:
            return state;
    }
}
export const ChangeFilterAC = (value: FilterValueType, todolistId: string): ChangeFilterActionType => ({
    type: CHANGE_FILTER,
    value, todolistId
}) as const
export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => ({
    type: REMOVE_TODOLIST,
    todolistId
}) as const
export const ChangeTodolistTitleAC = (id: string, newTitle: string): ChangeTodolistTitleActionType => ({
    type: CHANGE_TODOLIST_TITLE,
    id,
    newTitle
}) as const
export const AddTodolistAC = (todolist: TodolistType): AddTodolistActionType => ({
    type: ADD_TODOLIST,
    todolist
}) as const
export const GetTodolistAC = (todolists: TodolistType[]) => ({
    type: GET_TODOLIST,
    todolists
}) as const

export const getTodolistTC = () => (dispatch: Dispatch) => {
    todolistTaskApi.getTodolist().then(data => {
        dispatch(GetTodolistAC(data.data))
    })
};
export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistTaskApi.createTodolist(title).then(data => {
        const todolist = data.data.data.item
        dispatch(AddTodolistAC(todolist))
    })
};
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistTaskApi.deleteTodolist(todolistId).then(data => {
        dispatch(RemoveTodolistAC(todolistId))
    })
};
export const changeTodolistTitleTC = (todolistId: string,title:string) => (dispatch: Dispatch) => {
    todolistTaskApi.updateTodolist(todolistId,title).then(data => {
        dispatch(ChangeTodolistTitleAC(todolistId,title))
    })
}

export default todolistReducer;