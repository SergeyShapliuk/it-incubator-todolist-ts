import {applyMiddleware, combineReducers, createStore} from "redux";
import todolistReducer from "./todolist-reducer";
import tasksReducer from "./tasks-reducer";
import thunk from "redux-thunk";



export const RootReducer=combineReducers({
    todolists:todolistReducer,
    tasks:tasksReducer
})

export type RootStoreType=ReturnType<typeof RootReducer>

export const store=createStore(RootReducer,applyMiddleware(thunk));

// @ts-ignore
window.store=store