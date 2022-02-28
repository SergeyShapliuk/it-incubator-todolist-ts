import {setAppErrorAC, setAppStatusAC} from "../../components/app/app-reducer/AppReducer";
import {RootActionsTypes, RootThunkTypes} from "../../components/app/store";
import {authApi, LoginRequestType} from "../../api/todolist-task-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {clearTodosDataAC} from "../../components/features/TodolistList/Todolist/todolist-reducer";


const initialState = {
    isLoggedIn: false
}
export type InitialStateType = typeof initialState

export const authReducer = (state = initialState, action: RootActionsTypes): InitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state

    }
}

export const setIsLoggedIn = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)


export const loginTC = (data: LoginRequestType): RootThunkTypes => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authApi.login(data).then((data) => {
        if (data.data.resultCode === 0) {
            dispatch(setIsLoggedIn(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            if (data.data.messages.length) {
                dispatch(setAppErrorAC(data.data.messages[0]))
            } else {
                dispatch(setAppErrorAC('Some error occurred'))
            }
            dispatch(setAppStatusAC('failed'))
        }
    })
}
export const logoutTC = ():RootThunkTypes => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authApi.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(false))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(clearTodosDataAC())
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}



