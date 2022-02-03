import {appReducer, initialStateType, setErrorAC, setStatusAC} from "./AppReducer";

let startState:initialStateType;

beforeEach(()=>{
    startState={
        error:null,
        status:"idle"
    }
})
test("correct error message should be set", () => {

  const endState=appReducer(startState,setErrorAC('some error'))
    expect(endState.error).toBe('some error')

});
test("correct status message should be set", () => {

  const endState=appReducer(startState,setStatusAC('loading'))
    expect(endState.status).toBe('loading')

})