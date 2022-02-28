import {todolistTaskApi, TodolistType} from "../../../../api/todolist-task-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "../../../app/app-reducer/AppReducer";
import {RootActionsTypes, RootThunkTypes} from "../../../app/store";
import {getTasksTC} from "./tasks-reducer";


const CHANGE_FILTER = "CHANGE-FILTER"
const REMOVE_TODOLIST = "REMOVE-TODOLIST"
const CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE"
const ADD_TODOLIST = "ADD-TODOLIST"
const GET_TODOLIST = "GET-TODOLIST"
const CHANGE_TODOLIST_ENTITY_STATUS = "CHANGE_TODOLIST_ENTITY_STATUS"


const initialState: TodolistDomainType[] = []


const todolistReducer = (state: InitialTodolistStateType = initialState, action: RootActionsTypes): InitialTodolistStateType => {
    switch (action.type) {
        case "CHANGE-FILTER": {
            // const todolist = state.find(f => f.id === action.todolistId)
            // if (todolist) {
            //     todolist.filter = action.value
            // }
            return state.map(m => m.id === action.todolistId ? {...m, filter: action.value} : m)
        }
        case "CHANGE_TODOLIST_ENTITY_STATUS":
            return state.map(m => m.id === action.todolistId ? {...m, entityStatus: action.status} : m)
        case "REMOVE-TODOLIST":
            return state.filter(f => f.id !== action.todolistId)

        case "CHANGE-TODOLIST-TITLE":
            // const todolistTitle = state.find(f => f.id === action.id)
            // if (todolistTitle) {
            //     todolistTitle.title = action.newTitle
            // }
            return state.map(m => m.id === action.id ? {...m, title: action.newTitle} : m)

        case "ADD-TODOLIST":
            const newTodolist: TodolistDomainType = {...action.todolist, filter: "all", entityStatus: 'idle'}
            return [newTodolist, ...state]

        case "GET-TODOLIST":
            return action.todolists.map(tl => {
                return {...tl, filter: "all", entityStatus: 'idle'}
            })
        case "CLEAR-DATA":
            return []
        default:
            return state;
    }
}
export const ChangeFilterAC = (value: FilterValueType, todolistId: string) =>
    ({type: CHANGE_FILTER, value, todolistId}) as const
export const RemoveTodolistAC = (todolistId: string) =>
    ({type: REMOVE_TODOLIST, todolistId}) as const
export const ChangeTodolistTitleAC = (id: string, newTitle: string) =>
    ({type: CHANGE_TODOLIST_TITLE, id, newTitle}) as const
export const AddTodolistAC = (todolist: TodolistType) =>
    ({type: ADD_TODOLIST, todolist}) as const
export const GetTodolistAC = (todolists: TodolistType[]) =>
    ({type: GET_TODOLIST, todolists}) as const
export const changeTodolistEntityStatus = (todolistId: string, status: RequestStatusType) =>
    ({type: CHANGE_TODOLIST_ENTITY_STATUS, todolistId, status}) as const
export const clearTodosDataAC = () => ({type: "CLEAR-DATA"} as const)

export const getTodolistTC = (): RootThunkTypes => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistTaskApi.getTodolist().then(data => {
        dispatch(GetTodolistAC(data.data))
        dispatch(setAppStatusAC('succeeded'))
        return data.data
    })
        .then((data) => {
            data.forEach((tl) => {
                dispatch(getTasksTC(tl.id))
            })
        })
};

export const createTodolistTC = (title: string) => (dispatch: Dispatch<RootActionsTypes>) => {
    dispatch(setAppStatusAC('loading'))
    todolistTaskApi.createTodolist(title).then(data => {
        const todolist = data.data.data.item
        dispatch(AddTodolistAC(todolist))
        dispatch(setAppStatusAC('succeeded'))
    })
};
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch<RootActionsTypes>) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeTodolistEntityStatus(todolistId, "loading"))
    dispatch(changeTodolistEntityStatus(todolistId, "loading"))
    todolistTaskApi.deleteTodolist(todolistId).then(data => {
        dispatch(RemoveTodolistAC(todolistId))
    })
};
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<RootActionsTypes>) => {
    todolistTaskApi.updateTodolist(todolistId, title).then(data => {
        dispatch(ChangeTodolistTitleAC(todolistId, title))
    })
}

export default todolistReducer;

export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}
export type InitialTodolistStateType = typeof initialState

export type TodolistActionsTypes =
    ReturnType<typeof ChangeFilterAC>
    | ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof GetTodolistAC>
    | ReturnType<typeof changeTodolistEntityStatus>
    | ReturnType<typeof clearTodosDataAC>

export type FilterValueType = "all" | "active" | "completed"

