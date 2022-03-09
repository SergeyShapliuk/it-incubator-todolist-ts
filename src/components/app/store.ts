import {applyMiddleware, combineReducers, createStore} from "redux";
import todolistReducer, {TodolistActionsTypes} from "../features/TodolistList/Todolist/todolist-reducer";
import tasksReducer, {TasksActionsTypes} from "../features/TodolistList/Todolist/tasks-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {AppActionsTypes, appReducer, setAppErrorAC} from "./app-reducer/AppReducer";
import {authReducer, setIsLoggedIn} from "../../features/login/auth-reducer";




export const RootReducer=combineReducers({
    todolists:todolistReducer,
    tasks:tasksReducer,
    app:appReducer,
    auth:authReducer
})

export type RootStoreType=ReturnType<typeof RootReducer>

export type RootThunkTypes<ReturnType=void>=ThunkAction<ReturnType, RootStoreType, unknown, RootActionsTypes>


export const store=createStore(RootReducer,applyMiddleware(thunk));


export type RootActionsTypes= ReturnType<typeof setIsLoggedIn>
| ReturnType<typeof setAppErrorAC>
| AppActionsTypes
| TasksActionsTypes
| TodolistActionsTypes

// @ts-ignore
window.store=store