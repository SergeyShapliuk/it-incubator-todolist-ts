import {todolistTaskApi, TodolistType} from "../../../../api/todolist-task-api";
import {RequestStatusType, setAppStatusAC} from "../../../app/app-reducer/AppReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerAppError} from "../../../../utils/error-utils";


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
        // // RemoveTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
        // //     const index = state.findIndex(tl => tl.id === action.payload.todolistId)
        // //     if (index > -1) {
        // //         state.splice(index, 1)
        // //     }
        // },
        // ChangeTodolistTitleAC(state, action: PayloadAction<{ id: string, newTitle: string }>) {
        //     const index = state.findIndex(tl => tl.id === action.payload.id)
        //     state[index].title = action.payload.newTitle
        // },
        // AddTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
        //     state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        // },
        // GetTodolistAC(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
        //     return state = action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        // },
        changeTodolistEntityStatus(state, action: PayloadAction<{ todolistId: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].entityStatus = action.payload.status
        },
    },
    extraReducers: builder => {
        builder.addCase(getTodolistTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        })
        builder.addCase(deleteTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(createTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.newTitle
        })

    }
})
export const getTodolistTC = createAsyncThunk('todolist/getTodolistTC', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const data = await todolistTaskApi.getTodolist()
    try {
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolists: data.data}
    } catch (error: any) {
        handleServerAppError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})
export const deleteTodolistTC = createAsyncThunk('todolist/deleteTodolistTC', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    thunkAPI.dispatch(changeTodolistEntityStatus({todolistId: todolistId, status: "loading"}))
    const data = await todolistTaskApi.deleteTodolist(todolistId)
    thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
    return {todolistId: todolistId}
})
export const createTodolistTC = createAsyncThunk('todolist/createTodolistTC', async (title: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const data = await todolistTaskApi.createTodolist(title)
    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    return {todolist: data.data.data.item}
})
export const changeTodolistTitleTC = createAsyncThunk('todolist/changeTodolistTitleTC', async (param: { todolistId: string, title: string }, thunkAPI) => {
    const data = await todolistTaskApi.updateTodolist(param.todolistId, param.title)
    return {id: param.todolistId, newTitle: param.title}
})


export const todolistReducer = slice.reducer

export const {
    ChangeFilterAC,
    changeTodolistEntityStatus
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

// export const getTodolistTC = ()=> (dispatch:Dispatch) => {
//     dispatch(setAppStatusAC({status: 'loading'}))
//     todolistTaskApi.getTodolist().then(data => {
//         dispatch(GetTodolistAC({todolists: data.data}))
//         dispatch(setAppStatusAC({status: 'succeeded'}))
//         return data.data
//     })
//         .catch(error=>{
//             handleServerNetworkError(error,dispatch)
//         })
// };

// export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC({status: 'loading'}))
//     todolistTaskApi.createTodolist(title).then(data => {
//         const todolist = data.data.data.item
//         dispatch(AddTodolistAC({todolist: todolist}))
//         dispatch(setAppStatusAC({status: 'succeeded'}))
//     })
// };
// export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC({status: "loading"}))
//     dispatch(changeTodolistEntityStatus({todolistId: todolistId, status: "loading"}))
//     todolistTaskApi.deleteTodolist(todolistId).then(data => {
//         dispatch(RemoveTodolistAC({todolistId: todolistId}))
//         dispatch(setAppStatusAC({status: "succeeded"}))
//     })
// };
// export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
//     todolistTaskApi.updateTodolist(todolistId, title).then(data => {
//         dispatch(ChangeTodolistTitleAC({id: todolistId, newTitle: title}))
//     })
// }

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

