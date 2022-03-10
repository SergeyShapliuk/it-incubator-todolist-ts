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
        dispatch(setAppErrorAC({error:data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error:'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status:'failed'}))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC({error:error.message}))
    dispatch(setAppStatusAC({status:'failed'}))
}

type ErrorUtilsDispatchType = Dispatch<SetErrorActionType | SetStatusActionType>