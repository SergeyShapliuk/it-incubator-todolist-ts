import {createTodolistTC, deleteTodolistTC, getTodolistTC} from "./todolist-reducer";
import {TasksStateType} from "../../../app/App";
import {taskApi, UpdateTaskModelType} from "../../../../api/todolist-task-api";
import {RootStoreType} from "../../../app/store";
import {setAppStatusAC} from "../../../app/app-reducer/AppReducer";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {handleServerAppError, handleServerNetworkError} from "../../../../utils/error-utils";
import {AxiosError} from "axios";


//
// export type TasksActionsTypes =
//     ReturnType<typeof removeTaskAC>
//     | ReturnType<typeof addTaskAC>
//     | ReturnType<typeof updateTaskAC>
//     | ReturnType<typeof changeTitleAC>
//     | ReturnType<typeof AddTodolistAC>
//     | ReturnType<typeof RemoveTodolistAC>
//     | ReturnType<typeof GetTodolistAC>
//     | ReturnType<typeof getTasksAC>

const initialState: TasksStateType = {}

//export type initialTasksStateType = typeof initialState

const slice = createSlice({
    name: "task",
    initialState: initialState,
    reducers: {
        // removeTaskAC(state, action: PayloadAction<{ id: string, todolistId: string }>) {
        //     const tasks = state[action.payload.todolistId]
        //     const index = tasks.findIndex(tl => tl.id === action.payload.todolistId)
        //     if (index > -1) {
        //         tasks.splice(index, 1)
        //     }
        // },
        // addTaskAC(state, action: PayloadAction<TaskType>) {
        //     state[action.payload.todoListId].unshift(action.payload)
        // },
        // updateTaskAC(state, action: PayloadAction<{ id: string, model: UpdateTaskDomainTaskModelType, todolistId: string }>) {
        //     const tasks = state[action.payload.todolistId]
        //     const index = tasks.findIndex(tl => tl.id === action.payload.todolistId)
        //     if (index > -1) {
        //         tasks[index] = {...tasks[index], ...action.payload.model}
        //     }
        // },
        // getTasksAC(state, action: PayloadAction<{ tasks: TaskType[], todolistId: string }>) {
        //     state[action.payload.todolistId] = action.payload.tasks
        // }
    },

    extraReducers: (builder) => {
        builder.addCase(createTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(deleteTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.todolistId]
        })
        builder.addCase(getTodolistTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl) => {
                state[tl.id] = []
            })
        })
        builder.addCase(getTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        })
        builder.addCase(deleteTasksTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(tl => tl.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        })
        builder.addCase(createTasksTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        })
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(tl => tl.id === action.payload.taskId)
            if (index > -1) {
                tasks[index]={...tasks[index],...action.payload.model}
            }
        })
    }
})
export const getTasksTC = createAsyncThunk('task/getTasksTC', async (todolistId: string, thunkApi) => {
    thunkApi.dispatch(setAppStatusAC({status: 'loading'}))
    const data = await taskApi.getTask(todolistId)
    const tasks = data.data.items
    thunkApi.dispatch(setAppStatusAC({status: 'succeeded'}))
    return {tasks, todolistId}

})
export const deleteTasksTC = createAsyncThunk('task/deleteTasksTC', async (param: { taskId: string, todolistId: string }, thunkApi) => {
    thunkApi.dispatch(setAppStatusAC({status: 'loading'}))
    let data = await taskApi.deleteTask(param.taskId, param.todolistId)
    thunkApi.dispatch(setAppStatusAC({status: "succeeded"}))
    return {taskId: param.taskId, todolistId: param.todolistId}
})
export const createTasksTC = createAsyncThunk('task/createTasksTC', async (param: { title: string, todolistId: string }, thunkApi) => {
    thunkApi.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        let data = await taskApi.createTask(param.title, param.todolistId)
        if (data.data.resultCode === 0) {
            const task = data.data.data.item
            // const action = addTaskAC(task)
            // thunkApi.dispatch(action)
            thunkApi.dispatch(setAppStatusAC({status: "succeeded"}))
            return task;
        } else {
            handleServerAppError(data.data, thunkApi.dispatch)
            return thunkApi.rejectWithValue(null)
        }
    } catch (err: any) {
        const error: AxiosError = err
        handleServerNetworkError(error, thunkApi.dispatch)
        return thunkApi.rejectWithValue(null)
    }
})
export const updateTaskTC = createAsyncThunk('task/updateTaskTC', async (param: { todolistId: string,taskId: string, domainModel: UpdateTaskDomainTaskModelType}, thunkAPI) => {
    const allTasksFromState = thunkAPI.getState() as RootStoreType;
    const task = allTasksFromState.tasks[param.todolistId].find(t => t.id === param.taskId)
    if (!task) {
        return thunkAPI.rejectWithValue('task not found in the state')
    }
    const apiModel: UpdateTaskModelType = {
        title: task.title,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        description: task.description,
        completed: task.completed,
        status: task.status,
        ...param.domainModel
    }

    const res = await taskApi.updateTask(param.todolistId, param.taskId, apiModel)
    try {
        if (res.data.resultCode === 0) {
            return {todolistId: param.todolistId,taskId: param.taskId, model: param.domainModel}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})


export const tasksReducer = slice.reducer

export const {
    // removeTaskAC,
    // addTaskAC,
    // updateTaskAC,
    // getTasksAC
} = slice.actions

// const tasksReducer = (state: initialTasksStateType = initialState, action: RootActionsTypes): initialTasksStateType => {
//     switch (action.type) {
//         case "REMOVE-TASK": {
//             // let filteredTask = state[action.todolistId].filter(f => f.id !== action.id)
//             // state[action.todolistId] = filteredTask
//             // return {...state}
//             return {...state, [action.todolistId]: state[action.todolistId].filter(f => f.id !== action.id)}
//         }
//         case "ADD-TASK": {
//             return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
//         }
//         case "UPDATE-TASK": {
//             // let task = state[action.todolistId].find(f => f.id === action.id)
//             // if (task) {
//             //     task.isDone = action.isDone
//             // }
//             return {...state,
//                 [action.todolistId]: state[action.todolistId]
//                     .map(f => f.id === action.id ? {...f, ...action.model} : f)}
//         }
//         case "CHANGE-TITLE": {
//             // let todolistTitle = state[action.todolistId].find(f => f.id === action.id)
//             // if (todolistTitle) {
//             //     todolistTitle.title = action.newTitle
//             // }
//             return {...state,
//                 [action.todolistId]: state[action.todolistId]
//                     .map(f => f.id === action.id ? {...f, title: action.newTitle} : f)}
//         }
//         case "ADD-TODOLIST": {
//             //state[action.todolistId] = []
//             return {...state, [action.todolist.id]: []}
//         }
//         case "REMOVE-TODOLIST": {
//             delete state[action.todolistId]
//             return {...state}
//         }
//         case "GET-TODOLIST": {
//             const stateCopy = {...state}
//             action.todolists.forEach((tl) => {
//                 stateCopy[tl.id] = []
//             })
//             return stateCopy;
//         }
//         case "GET_TASKS": {
//             let stateCopy = {...state}
//             stateCopy[action.todolistId] = action.tasks
//             return stateCopy
//         }
//         case "CLEAR-DATA":
//             return {}
//         default:
//             return state;
//     }
// }
// export const removeTaskAC = (id: string, todolistId: string)=>
//     ({type: "REMOVE-TASK", id, todolistId}) as const
// export const addTaskAC = (task: TaskType) =>
//     ({type: "ADD-TASK", task}) as const
// export const updateTaskAC = (id: string, model:UpdateTaskDomainTaskModelType, todolistId: string)=>
//     ({type: "UPDATE-TASK", id, model, todolistId}) as const
// export const changeTitleAC = (id: string, newTitle: string, todolistId: string)=>
//     ({type: "CHANGE-TITLE", id, newTitle, todolistId}) as const
// export const getTasksAC = (tasks: TaskType[], todolistId: string)=>
//     ({type: "GET_TASKS", tasks, todolistId}) as const


// export const getTasksTC_ = (todolistId: string)=> (dispatch:Dispatch) => {
//     dispatch(setAppStatusAC({status: 'loading'}))
//     taskApi.getTask(todolistId).then(data => {
//         const tasks =data.data.items
//         const action = getTasksAC({tasks: tasks, todolistId: todolistId})
//         dispatch(action)
//         dispatch(setAppStatusAC({status: 'succeeded'}))
//     })
// };
// export const createTasksTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC({status: 'loading'}))
//     taskApi.createTask(title, todolistId).then((data) => {
//         if (data.data.resultCode === 0) {
//             const task = data.data.data.item
//             const action = addTaskAC(task)
//             dispatch(action)
//             dispatch(setAppStatusAC({status: 'succeeded'}))
//         } else {
//             handleServerAppError(data.data, dispatch)
//         }
//     })
//         .catch(error => {
//             handleServerNetworkError(error, dispatch)
//         })
// };
// export const deleteTasksTC_ = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC({status: 'loading'}))
//     taskApi.deleteTask(taskId, todolistId).then((data) => {
//         const action = removeTaskAC({id: taskId, todolistId: todolistId})
//         dispatch(action)
//         dispatch(setAppStatusAC({status: "succeeded"}))
//
//     })
// };
export type UpdateTaskDomainTaskModelType = {
    title?: string
    description?: string
    completed?: boolean
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
};
// export const updateTaskTC = (taskId: string, domainModel: UpdateTaskDomainTaskModelType, todolistId: string) => (dispatch: Dispatch, getState: () => RootStoreType) => {
//     const allTasksFromState = getState();
//     const task = allTasksFromState.tasks[todolistId].find(t => t.id === taskId)
//     if (!task) {
//         console.warn('task not found in the state')
//         return
//     }
//     const apiModel: UpdateTaskModelType = {
//         title: task.title,
//         priority: task.priority,
//         startDate: task.startDate,
//         deadline: task.deadline,
//         description: task.description,
//         completed: task.completed,
//         status: task.status,
//         ...domainModel
//     }
//     taskApi.updateTask(todolistId, taskId, apiModel)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 const action = updateTaskAC({id: taskId, model: domainModel, todolistId: todolistId})
//                 dispatch(action)
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch(error => {
//             handleServerNetworkError(error, dispatch)
//         })
// }
//

export default tasksReducer;