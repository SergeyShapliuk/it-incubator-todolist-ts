import {v1} from "uuid";

import {FilterValueType} from "../../../app/AppExample";
import todolistReducer, {
    AddTodolistAC,
    ChangeFilterAC, changeTodolistEntityStatus,
    ChangeTodolistTitleAC, GetTodolistAC,
    RemoveTodolistAC, TodolistDomainType
} from "./todolist-reducer";
import {RequestStatusType} from "../../../app/app-reducer/AppReducer";

let todolistId1:string
let todolistId2:string
let startState:TodolistDomainType[]=[]

beforeEach(()=>{
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all",entityStatus:"idle",addedDate: "",
            order: 0},
        {id: todolistId2, title: "What to buy", filter: "all",entityStatus:"idle",addedDate: "",
            order: 0}
    ]
})
test("ChangeFilter", () => {

    let newFilter: FilterValueType = "completed"

    const action = ChangeFilterAC({value:newFilter, todolistId:todolistId1})
    const changeFilterState = todolistReducer(startState, action)

    expect(changeFilterState[0].filter).toBe("completed")
    expect(changeFilterState[1].filter).toBe('all')
});

test("RemoveTodolist", () => {

    const action = RemoveTodolistAC({todolistId:todolistId1})
    const removeTodolist = todolistReducer(startState, action)

    expect(removeTodolist[0].id).toBe(todolistId2)
    expect(startState).not.toBe(removeTodolist)
});

test("ChangeTodolistTitle", () => {

    const action = ChangeTodolistTitleAC({id:todolistId2, newTitle:"New Title"})
    const changeTodolistTitle = todolistReducer(startState, action)

    expect(changeTodolistTitle[0].title).toBe("What to learn")
    expect(changeTodolistTitle[1].title).toBe("New Title")
})

test("AddTodolist", () => {

    const action = AddTodolistAC({todolist:{
        title:"New Title",
        id:"",
        addedDate:"",
        order:0
    }})
    const AddTodolist = todolistReducer(startState, action)

    expect(AddTodolist[0].title).toBe("New Title")
    expect(AddTodolist[1].title).toBe( "What to learn")
    expect(AddTodolist.length).toBe( 3)
});

test("GetTodolist", () => {

    const action = GetTodolistAC({todolists:startState})
    const GetTodolist = todolistReducer(startState, action)

    expect(GetTodolist.length).toBe(2)
    expect(GetTodolist[1].id).toBe(todolistId2)
});
test("entity status of todolist should be changed", () => {

    let newStatus: RequestStatusType="loading"

    const action = changeTodolistEntityStatus({todolistId:todolistId2, status:newStatus})
    const endState = todolistReducer(startState, action)

    expect(endState[0].entityStatus).toBe("idle")
    expect(endState[1].entityStatus).toBe(newStatus)
});