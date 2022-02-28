import {
    setAppErrorAC,
    setAppStatusAC,
    SetErrorActionType, SetStatusActionType
} from '../components/app/app-reducer/AppReducer';
import { Dispatch } from 'redux';
import {TodolistResponseType} from "../api/todolist-task-api";


// generic function
export const handleServerAppError = <T>(data: TodolistResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetErrorActionType | SetStatusActionType>