import {AddTodolistAC, GetTodolistAC, RemoveTodolistAC} from "./todolist-reducer";
import {TasksStateType} from "../../../app/App";
import {taskApi, TaskType, UpdateTaskModelType} from "../../../../api/todolist-task-api";
import {Dispatch} from "redux";
import {RootStoreType} from "../../../app/store";
import {setAppErrorAC, SetErrorActionType, setAppStatusAC, SetStatusActionType} from "../../../app/app-reducer/AppReducer";


type ActionsTypes =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof changeTitleAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof GetTodolistAC>
    | ReturnType<typeof getTasksAC>

const initialState: TasksStateType = {}

export type initialTasksStateType = typeof initialState

const tasksReducer = (state: initialTasksStateType = initialState, action: ActionsTypes): initialTasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            // let filteredTask = state[action.todolistId].filter(f => f.id !== action.id)
            // state[action.todolistId] = filteredTask
            // return {...state}
            return {...state, [action.todolistId]: state[action.todolistId].filter(f => f.id !== action.id)}
        }
        case "ADD-TASK": {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case "UPDATE-TASK": {
            // let task = state[action.todolistId].find(f => f.id === action.id)
            // if (task) {
            //     task.isDone = action.isDone
            // }
            return {...state,
                [action.todolistId]: state[action.todolistId]
                    .map(f => f.id === action.id ? {...f, ...action.model} : f)}
        }
        case "CHANGE-TITLE": {
            // let todolistTitle = state[action.todolistId].find(f => f.id === action.id)
            // if (todolistTitle) {
            //     todolistTitle.title = action.newTitle
            // }
            return {...state,
                [action.todolistId]: state[action.todolistId]
                    .map(f => f.id === action.id ? {...f, title: action.newTitle} : f)}
        }
        case "ADD-TODOLIST": {
            //state[action.todolistId] = []
            return {...state, [action.todolist.id]: []}
        }
        case "REMOVE-TODOLIST": {
            delete state[action.todolistId]
            return {...state}
        }
        case "GET-TODOLIST": {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case "GET_TASKS": {
            let stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state;
    }
}
export const removeTaskAC = (id: string, todolistId: string)=>
    ({type: "REMOVE-TASK", id, todolistId}) as const
export const addTaskAC = (task: TaskType) =>
    ({type: "ADD-TASK", task}) as const
export const updateTaskAC = (id: string, model:UpdateTaskDomainTaskModelType, todolistId: string)=>
    ({type: "UPDATE-TASK", id, model, todolistId}) as const
export const changeTitleAC = (id: string, newTitle: string, todolistId: string)=>
    ({type: "CHANGE-TITLE", id, newTitle, todolistId}) as const
export const getTasksAC = (tasks: TaskType[], todolistId: string)=>
    ({type: "GET_TASKS", tasks, todolistId}) as const

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsTypes|SetStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    taskApi.getTask(todolistId).then(data => {
        const tasks = data.data.items
        const action = getTasksAC(tasks, todolistId)
        dispatch(action)
        dispatch(setAppStatusAC('succeeded'))
    })
};
export const createTasksTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsTypes|SetErrorActionType|SetStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    taskApi.createTask(title,todolistId).then((data) => {
       if(data.data.resultCode===0){
           const task=data.data.data.item
           const action = addTaskAC(task)
           dispatch(action)
           dispatch(setAppStatusAC('succeeded'))
       }else {
           if(data.data.messages.length){
               dispatch(setAppErrorAC(data.data.messages[0]))
           }else {
               dispatch(setAppErrorAC('Some error occurred'))
           }
           dispatch(setAppStatusAC('failed'))
       }

    })
};
export const deleteTasksTC = (todolistId:string,taskId:string) => (dispatch: Dispatch<ActionsTypes>) => {
    taskApi.deleteTask(taskId,todolistId).then((data) => {
        const action = removeTaskAC(taskId,todolistId)
        dispatch(action)
    })
};
export type UpdateTaskDomainTaskModelType={
    title?: string
    description?: string
    completed?: boolean
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
};
export const updateTaskTC = (taskId: string, domainModel:UpdateTaskDomainTaskModelType,todolistId: string) => (dispatch: Dispatch<ActionsTypes>,getState:()=>RootStoreType) => {
    const allTasksFromState = getState();
    const task = allTasksFromState.tasks[todolistId].find(t =>t.id === taskId)
    if (!task) {
        console.warn('task not found in the state')
        return
    }
    const apiModel:UpdateTaskModelType={
        title: task.title,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        description:task.description,
        completed:task.completed,
        status:task.status,
        ...domainModel
    }
        taskApi.updateTask(todolistId, taskId,apiModel

        ).then((res) => {
            const action = updateTaskAC(taskId, domainModel, todolistId)
            dispatch(action)
        })
    }


export default tasksReducer;