
import {authApi} from "../../../api/todolist-task-api";
import {setIsLoggedIn} from "../../../features/login/auth-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: initialStateType = {
    status: "idle",
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        // setIsInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
        //     state.isInitialized = action.payload.isInitialized
        // }
    },
    extraReducers:builder => {
        builder.addCase(initializeAppTC.fulfilled,(state)=>{
            state.isInitialized=true
        })
    }
})
export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const data = await authApi.me()
    if (data.data.resultCode === 0) {
        thunkAPI.dispatch(setIsLoggedIn({value: true}));
    } else {
    }
    return;
})


export const appReducer = slice.reducer

export const {setAppErrorAC, setAppStatusAC} = slice.actions
// (state: initialStateType = initialState, action: RootActionsTypes): initialStateType {
//     switch (action.type) {
//         case "APP/SET-STATUS":
//             return {...state, status: action.status}
//         case "APP/SET-ERROR":
//             return {...state, error: action.error}
//         case  "APP/SET-INITIALIZED":
//             return {...state,isInitialized:action.isInitialized}
//
//         default:
//             return {...state}
//     }
// }

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"


export type initialStateType = {
    status: RequestStatusType,
    error: string | null
    isInitialized: boolean
}
// export const setAppErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)
// export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
// export const setIsInitialized = (isInitialized: boolean) => ({type: "APP/SET-INITIALIZED", isInitialized} as const)

// export const initializeAppTC = (): RootThunkTypes => (dispatch) => {
//     dispatch(setAppStatusAC({status:'loading'}))
//     authApi.me().then(data => {
//         if (data.data.resultCode === 0) {
//             dispatch(setIsLoggedIn({ value: true }));
//         } else {
//         }
//     })
//         .finally(()=>{
//             dispatch(setIsInitialized({isInitialized:true}))
//         })
// }
//

export type SetErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetStatusActionType = ReturnType<typeof setAppStatusAC>;
export type AppActionsTypes =
    | SetErrorActionType
    | SetStatusActionType
    // | ReturnType<typeof setIsInitialized>
