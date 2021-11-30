import {v1} from "uuid";
import {FilterValueType, TodolistType} from "../App";
import todolistReducer, {
    AddTodolistAC,
    ChangeFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC
} from "./todolist-reducer";


test("ChangeFilter", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let startState: TodolistType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    let newFilter: FilterValueType = "completed"

    const action = ChangeFilterAC(newFilter, todolistId1)
    const changeFilterState = todolistReducer(startState, action)

    expect(changeFilterState[0].filter).toBe("completed")
    expect(changeFilterState[1].filter).toBe('all')

});
test("RemoveTodolist", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let startState: TodolistType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]


    const action = RemoveTodolistAC(todolistId1)
    const removeTodolist = todolistReducer(startState, action)

    expect(removeTodolist[0].id).toBe(todolistId2)
    expect(startState).not.toBe(removeTodolist)


});
test("ChangeTodolistTitle", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let startState: TodolistType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]


    const action = ChangeTodolistTitleAC(todolistId2, "New Title")
    const changeTodolistTitle = todolistReducer(startState, action)

    expect(changeTodolistTitle[0].title).toBe("What to learn")
    expect(changeTodolistTitle[1].title).toBe("New Title")


})
test("AddTodolist", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let startState: TodolistType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]


    const action = AddTodolistAC("New Title")
    const AddTodolist = todolistReducer(startState, action)

    expect(AddTodolist[0].title).toBe("New Title")
    expect(AddTodolist[1].title).toBe( "What to learn")
    expect(AddTodolist.length).toBe( 3)


});