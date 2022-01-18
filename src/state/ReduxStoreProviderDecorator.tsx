import React from "react";
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {RootStoreType} from "./store";
import tasksReducer from "./tasks-reducer";
import todolistReducer from "./todolist-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-task-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all",addedDate: "",
            order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all",addedDate: "",
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
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as RootStoreType);

export const ReduxStoreProviderDecorator=(storyFn:()=>React.ReactNode)=>{
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}


