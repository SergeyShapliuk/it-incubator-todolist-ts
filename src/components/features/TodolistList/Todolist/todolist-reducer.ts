import {todolistTaskApi, TodolistType} from "../../../../api/todolist-task-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "../../../app/app-reducer/AppReducer";
import {RootActionsTypes, RootThunkTypes} from "../../../app/store";
import {getTasksTC} from "./tasks-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


// const CHANGE_FILTER = "CHANGE-FILTER"
// const REMOVE_TODOLIST = "REMOVE-TODOLIST"
// const CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE"
// const ADD_TODOLIST = "ADD-TODOLIST"
// const GET_TODOLIST = "GET-TODOLIST"
// const CHANGE_TODOLIST_ENTITY_STATUS = "CHANGE_TODOLIST_ENTITY_STATUS"
//

const initialState: TodolistDomainType[] = []

const slice = createSlice({
    name: "todolist",
    initialState: initialState,
    reducers: {
        ChangeFilterAC(state, action: PayloadAction<{ value: FilterValueType, todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].filter = action.payload.value
        },
        RemoveTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        ChangeTodolistTitleAC(state, action: PayloadAction<{ id: string, newTitle: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.newTitle
        },
        AddTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        },
        GetTodolistAC(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
            return state = action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        },
        changeTodolistEntityStatus(state, action: PayloadAction<{ todolistId: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].entityStatus = action.payload.status
        },
        clearTodosDataAC() {
            return []
        }
    },
})

export const todolistReducer = slice.reducer

export const {
    ChangeFilterAC, RemoveTodolistAC,
    ChangeTodolistTitleAC, AddTodolistAC,
    GetTodolistAC, changeTodolistEntityStatus, clearTodosDataAC
} = slice.actions
//
// const todolistReducer = (state: InitialTodolistStateType = initialState, action: RootActionsTypes): InitialTodolistStateType => {
//     switch (action.type) {
//         case "CHANGE-FILTER": {
//             // const todolist = state.find(f => f.id === action.todolistId)
//             // if (todolist) {
//             //     todolist.filter = action.value
//             // }
//             return state.map(m => m.id === action.todolistId ? {...m, filter: action.value} : m)
//         }
//         case "CHANGE_TODOLIST_ENTITY_STATUS":
//             return state.map(m => m.id === action.todolistId ? {...m, entityStatus: action.status} : m)
//         case "REMOVE-TODOLIST":
//             return state.filter(f => f.id !== action.todolistId)
//
//         case "CHANGE-TODOLIST-TITLE":
//             // const todolistTitle = state.find(f => f.id === action.id)
//             // if (todolistTitle) {
//             //     todolistTitle.title = action.newTitle
//             // }
//             return state.map(m => m.id === action.id ? {...m, title: action.newTitle} : m)
//
//         case "ADD-TODOLIST":
//             const newTodolist: TodolistDomainType = {...action.todolist, filter: "all", entityStatus: 'idle'}
//             return [newTodolist, ...state]
//
//         case "GET-TODOLIST":
//             return action.todolists.map(tl => {
//                 return {...tl, filter: "all", entityStatus: 'idle'}
//             })
//         case "CLEAR-DATA":
//             return []
//         default:
//             return state;
//     }
// }
// export const ChangeFilterAC = (value: FilterValueType, todolistId: string) =>
//     ({type: CHANGE_FILTER, value, todolistId}) as const
// export const RemoveTodolistAC = (todolistId: string) =>
//     ({type: REMOVE_TODOLIST, todolistId}) as const
// export const ChangeTodolistTitleAC = (id: string, newTitle: string) =>
//     ({type: CHANGE_TODOLIST_TITLE, id, newTitle}) as const
// export const AddTodolistAC = (todolist: TodolistType) =>
//     ({type: ADD_TODOLIST, todolist}) as const
// export const GetTodolistAC = (todolists: TodolistType[]) =>
//     ({type: GET_TODOLIST, todolists}) as const
// export const changeTodolistEntityStatus = (todolistId: string, status: RequestStatusType) =>
//     ({type: CHANGE_TODOLIST_ENTITY_STATUS, todolistId, status}) as const
// export const clearTodosDataAC = () => ({type: "CLEAR-DATA"} as const)

export const getTodolistTC = (): RootThunkTypes => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistTaskApi.getTodolist().then(data => {
        dispatch(GetTodolistAC({todolists: data.data}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return data.data
    })
        .then((data) => {
            data.forEach((tl) => {
                dispatch(getTasksTC(tl.id))
            })
        })
};

export const createTodolistTC = (title: string) => (dispatch: Dispatch<RootActionsTypes>) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistTaskApi.createTodolist(title).then(data => {
        const todolist = data.data.data.item
        dispatch(AddTodolistAC({todolist: todolist}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    })
};
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch<RootActionsTypes>) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changeTodolistEntityStatus({todolistId: todolistId, status: "loading"}))
    dispatch(changeTodolistEntityStatus({todolistId: todolistId, status: "loading"}))
    todolistTaskApi.deleteTodolist(todolistId).then(data => {
        dispatch(RemoveTodolistAC({todolistId: todolistId}))
    })
};
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<RootActionsTypes>) => {
    todolistTaskApi.updateTodolist(todolistId, title).then(data => {
        dispatch(ChangeTodolistTitleAC({id: todolistId, newTitle: title}))
    })
}

export default todolistReducer;

export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}
//export type InitialTodolistStateType = typeof initialState

// export type TodolistActionsTypes =
//     ReturnType<typeof ChangeFilterAC>
//     | ReturnType<typeof RemoveTodolistAC>
//     | ReturnType<typeof ChangeTodolistTitleAC>
//     | ReturnType<typeof AddTodolistAC>
//     | ReturnType<typeof GetTodolistAC>
//     | ReturnType<typeof changeTodolistEntityStatus>
//     | ReturnType<typeof clearTodosDataAC>

export type FilterValueType = "all" | "active" | "completed"

