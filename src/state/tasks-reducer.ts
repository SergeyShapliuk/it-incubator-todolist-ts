import {AddTodolistAC, GetTodolistAC, RemoveTodolistAC} from "./todolist-reducer";
import {TasksStateType} from "../components/appWithRedux/AppWithRedux";
import {taskApi, TaskType, UpdateTaskModelType} from "../api/todolist-task-api";
import {Dispatch} from "redux";
import {RootStoreType} from "./store";


type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    id: string
    todolistId: string
}

type UpdateTaskActionType = {
    type: "UPDATE-TASK"
    id: string
   model:UpdateTaskDomainTaskModelType
    todolistId: string
}
type ChangeTitleActionType = {
    type: "CHANGE-TITLE"
    id: string
    newTitle: string
    todolistId: string
}


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
            const stateCopy = {...state}
            // let newTask:TaskType = {
            //     id: v1(),
            //     title: action.title,
            //     status: TaskStatuses.New,
            //     todoListId: action.todolistId,
            //     description: "",
            //     startDate: "",
            //     deadline: "",
            //     addedDate: "",
            //     order: 0,
            //     priority: TaskPriorities.Low,
            //     completed: false
            // }
            const newTask = action.task
            const tasks = stateCopy[newTask.todoListId];
            const newTasks = [newTask, ...tasks];
            stateCopy[newTask.todoListId] = newTasks
            // state[action.todolistId] = [newTask, ...state[action.todolistId]]
            // return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
            return stateCopy
        }
        case "UPDATE-TASK": {
            // let task = state[action.todolistId].find(f => f.id === action.id)
            // if (task) {
            //     task.isDone = action.isDone
            // }
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(f => f.id === action.id ? {
                    ...f,
                    ...action.model
                } : f)
            }
        }
        case "CHANGE-TITLE": {
            // let todolistTitle = state[action.todolistId].find(f => f.id === action.id)
            // if (todolistTitle) {
            //     todolistTitle.title = action.newTitle
            // }
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(f => f.id === action.id ? {
                    ...f,
                    title: action.newTitle
                } : f)
            }
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
export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => ({
    type: "REMOVE-TASK",
    id, todolistId
}) as const
export const addTaskAC = (task: TaskType) => ({
    type: "ADD-TASK",
    task
}) as const
export const updateTaskAC = (id: string, model:UpdateTaskDomainTaskModelType, todolistId: string): UpdateTaskActionType => ({
    type: "UPDATE-TASK", id, model, todolistId
}) as const
export const changeTitleAC = (id: string, newTitle: string, todolistId: string): ChangeTitleActionType => ({
    type: "CHANGE-TITLE",
    id,
    newTitle,
    todolistId
}) as const
export const getTasksAC = (tasks: TaskType[], todolistId: string) => ({
    type: "GET_TASKS",
    tasks,
    todolistId
}) as const

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsTypes>) => {
    taskApi.getTask(todolistId).then(data => {
        const tasks = data.data.items
        const action = getTasksAC(tasks, todolistId)
        dispatch(action)
    })
};
export const createTasksTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    taskApi.createTask(title,todolistId).then((data) => {
        const task=data.data.data.item
        const action = addTaskAC(task)
        dispatch(action)
    })
};
export const deleteTasksTC = (todolistId:string,taskId:string) => (dispatch: Dispatch) => {
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