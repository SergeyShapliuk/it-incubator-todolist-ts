import {RootActionsTypes, RootThunkTypes} from "../store";
import {authApi} from "../../../api/todolist-task-api";
import {setIsLoggedIn} from "../../../features/login/auth-reducer";

const initialState: initialStateType = {
    status: "idle",
    error: null,
    isInitialized: false
}

export function appReducer(state: initialStateType = initialState, action: RootActionsTypes): initialStateType {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case  "APP/SET-INITIALIZED":
            return {...state,isInitialized:action.isInitialized}

        default:
            return {...state}
    }
}

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"


export type initialStateType = {
    status: RequestStatusType,
    error: string | null
    isInitialized: boolean
}
export const setAppErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setIsInitialized = (isInitialized: boolean) => ({type: "APP/SET-INITIALIZED", isInitialized} as const)

export const initializeAppTC = (): RootThunkTypes => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authApi.me().then(data => {
        debugger
        if (data.data.resultCode === 0) {
            dispatch(setIsLoggedIn(true));
        } else {
        }
    })
        .finally(()=>{
            dispatch(setIsInitialized(true))
        })
}


export type SetErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetStatusActionType = ReturnType<typeof setAppStatusAC>;
export type AppActionsTypes =
    | SetErrorActionType
    | SetStatusActionType
    | ReturnType<typeof setIsInitialized>
