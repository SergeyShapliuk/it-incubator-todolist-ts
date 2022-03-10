import {setAppErrorAC, setAppStatusAC} from "../../components/app/app-reducer/AppReducer";
import { RootThunkTypes} from "../../components/app/store";
import {authApi, LoginRequestType} from "../../api/todolist-task-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {clearTodosDataAC} from "../../components/features/TodolistList/Todolist/todolist-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";




const initialState = {
    isLoggedIn: false
}
// export type InitialStateType = typeof initialState

const slice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setIsLoggedIn(state,action:PayloadAction<{ value: boolean }>){
            state.isLoggedIn=action.payload.value
        }
},
})

export const authReducer = slice.reducer

export const {setIsLoggedIn}=slice.actions
    //(state = initialState, action: RootActionsTypes): InitialStateType => {
//     switch (action.type) {
//         case "login/SET-IS-LOGGED-IN":
//             return {...state, isLoggedIn: action.value}
//         default:
//             return state
//
//     }
// }

//export const setIsLoggedIn = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)


export const loginTC = (data: LoginRequestType): RootThunkTypes => (dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    authApi.login(data).then((data) => {
        if (data.data.resultCode === 0) {
            dispatch(setIsLoggedIn({ value: true }))
            dispatch(setAppStatusAC({status:'succeeded'}))
        } else {
            if (data.data.messages.length) {
                dispatch(setAppErrorAC({error:data.data.messages[0]}))
            } else {
                dispatch(setAppErrorAC({error:'Some error occurred'}))
            }
            dispatch(setAppStatusAC({status:'failed'}))
        }
    })
}
export const logoutTC = ():RootThunkTypes => (dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    authApi.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn({ value: false }))
                dispatch(setAppStatusAC({status:'succeeded'}))
                dispatch(clearTodosDataAC())
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}



