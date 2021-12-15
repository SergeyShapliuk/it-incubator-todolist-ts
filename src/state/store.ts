import {combineReducers, createStore} from "redux";
import todolistReducer from "./todolist-reducer";
import tasksReducer from "./tasks-reducer";



export const RootReducer=combineReducers({
    todolists:todolistReducer,
    tasks:tasksReducer
})

export type RootStoreType=ReturnType<typeof RootReducer>

export const store=createStore(RootReducer);

// @ts-ignore
window.store=store