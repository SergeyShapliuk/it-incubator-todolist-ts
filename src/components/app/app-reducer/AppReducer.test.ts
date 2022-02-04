import {appReducer, initialStateType, setAppErrorAC, setAppStatusAC} from "./AppReducer";

let startState:initialStateType;

beforeEach(()=>{
    startState={
        error:null,
        status:"idle"
    }
})
test("correct error message should be set", () => {

  const endState=appReducer(startState,setAppErrorAC('some error'))
    expect(endState.error).toBe('some error')

});
test("correct status message should be set", () => {

  const endState=appReducer(startState,setAppStatusAC('loading'))
    expect(endState.status).toBe('loading')

})