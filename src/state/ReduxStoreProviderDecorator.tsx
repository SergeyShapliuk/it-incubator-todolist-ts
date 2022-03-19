import React from "react";
import {Provider} from "react-redux";
import {combineReducers} from "redux";
import {RootReducerType, RootStoreType} from "../components/app/store";
import tasksReducer from "../components/features/TodolistList/Todolist/tasks-reducer";
import todolistReducer from "../components/features/TodolistList/Todolist/todolist-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-task-api";
import {appReducer} from "../components/app/app-reducer/AppReducer";
import thunk from "redux-thunk";
import {authReducer} from "../features/login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer:RootReducerType = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
    app:appReducer,
    auth:authReducer
})

const initialGlobalState:RootStoreType= {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all",entityStatus:"idle",addedDate: "",
            order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all",entityStatus:"loading",addedDate: "",
            order: 0}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: '1', title: "HTML&CSS", status:TaskStatuses.New,todoListId:"todolistId1",description:"",startDate:"",deadline:"",addedDate:"",order:0, priority:TaskPriorities.Low,completed:false},
            {id: '2', title: "JS", status:TaskStatuses.New,todoListId:"todolistId1",description:"",startDate:"",deadline:"",addedDate:"",order:0, priority:TaskPriorities.Low,completed:false}
        ],
        ["todolistId2"]: [
            {id: '3', title: "Milk", status:TaskStatuses.New,todoListId:"todolistId2",description:"",startDate:"",deadline:"",addedDate:"",order:0, priority:TaskPriorities.Low,completed:false},
            {id: '4', title: "React Book",status:TaskStatuses.New,todoListId:"todolistId2",description:"",startDate:"",deadline:"",addedDate:"",order:0, priority:TaskPriorities.Low,completed:false}
        ]

        },
    app:{
        status:"idle",
        error:null,
        isInitialized: false
    },
    auth:{
        isLoggedIn: false
    }
};

export const storyBookStore =configureStore({
    reducer:rootReducer,
    preloadedState:initialGlobalState,
    middleware:getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
});

export const ReduxStoreProviderDecorator=(storyFn:()=>React.ReactNode)=>{
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}


