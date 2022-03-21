import {setAppStatusAC} from "../../components/app/app-reducer/AppReducer";
import {authApi, FieldErrorType, LoginRequestType} from "../../api/todolist-task-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";


const initialState = {
    isLoggedIn: false
}
// export type InitialStateType = typeof initialState

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state) => {
            state.isLoggedIn = true
        })
        builder.addCase(logoutTC.fulfilled, (state) => {
            state.isLoggedIn = false
        })
    }
})
export const loginTC = createAsyncThunk<undefined,LoginRequestType, {
    rejectValue: { errors: string[], fieldsErrors?: FieldErrorType[] }
}>('auth/login', async (param: LoginRequestType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const data = await authApi.login(param)
        if (data.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return;
        } else {
            handleServerAppError(data.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: data.data.messages, fieldsErrors: data.data.fieldsErrors})
        }
    } catch (err:any) {
        const error: AxiosError = err
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})

    }
})
export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authApi.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return;
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    } catch (err:any) {
        const error: AxiosError = err
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})


export const authReducer = slice.reducer

export const {setIsLoggedIn} = slice.actions
//(state = initialState, action: RootActionsTypes): InitialStateType => {
//     switch (action.type) {
//         case "login/SET-IS-LOGGED-IN":
//             return {...state, isLoggedIn: action.value}
//         default:
//             return state
//
//     }
// }

//export const setIsLoggedIn = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)


// export const loginTC = (data: LoginRequestType): RootThunkTypes => (dispatch) => {
//     dispatch(setAppStatusAC({status:'loading'}))
//     authApi.login(data).then((data) => {
//         if (data.data.resultCode === 0) {
//             dispatch(setIsLoggedIn({ value: true }))
//             dispatch(setAppStatusAC({status:'succeeded'}))
//         } else {
//             if (data.data.messages.length) {
//                 dispatch(setAppErrorAC({error:data.data.messages[0]}))
//             } else {
//                 dispatch(setAppErrorAC({error:'Some error occurred'}))
//             }
//             dispatch(setAppStatusAC({status:'failed'}))
//         }
//     })
// }
// export const logoutTC = ():RootThunkTypes => (dispatch) => {
//     dispatch(setAppStatusAC({status:'loading'}))
//     authApi.logout()
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setIsLoggedIn({ value: false }))
//                 dispatch(setAppStatusAC({status:'succeeded'}))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }



