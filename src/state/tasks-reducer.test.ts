import tasksReducer, {addTaskAC, changeStatusAC, changeTitleAC, removeTaskAC} from "./tasks-reducer";
import {AddTodolistAC, RemoveTodolistAC} from "./todolist-reducer";

import {TaskPriorities, TaskStatuses} from "../api/todolist-task-api";

let startState = {};
beforeEach(()=>{
    startState={
    "todolistId1": [
        {id: "1", title: "CSS",  status:TaskStatuses.New,todoListId:"todolistId1",description:"",startDate:"",deadline:"",addedDate:"",order:0, priority:TaskPriorities.Low,completed:false},
        {id: "2", title: "HTML", status:TaskStatuses.Completed,todoListId:"todolistId1",description:"",startDate:"",deadline:"",addedDate:"",order:0, priority:TaskPriorities.Low,completed:false},
        {id: "3", title: "HTML",status:TaskStatuses.New,todoListId:"todolistId1",description:"",startDate:"",deadline:"",addedDate:"",order:0, priority:TaskPriorities.Low,completed:false},
    ],
    "todolistId2": [
        {id: "1", title: "CSS", status:TaskStatuses.Completed,todoListId:"todolistId2",description:"",startDate:"",deadline:"",addedDate:"",order:0, priority:TaskPriorities.Low,completed:false},
        {id: "2", title: "HTML", status:TaskStatuses.New,todoListId:"todolistId2",description:"",startDate:"",deadline:"",addedDate:"",order:0, priority:TaskPriorities.Low,completed:false},
        {id: "3", title: "HTML", status:TaskStatuses.Completed,todoListId:"todolistId2",description:"",startDate:"",deadline:"",addedDate:"",order:0, priority:TaskPriorities.Low,completed:false},

    ]}

});
test("RemoveTask", () => {
    const action = removeTaskAC("2", "todolistId2")
    const removeTaskState = tasksReducer(startState, action)

    expect(removeTaskState["todolistId1"].length).toBe(3)
    expect(removeTaskState["todolistId2"].length).toBe(2)


});
test("addTask", () => {

    const action = addTaskAC("New Task", "todolistId2")
    const addTaskState = tasksReducer(startState, action)

    expect(addTaskState["todolistId2"].length).toBe(4)
    expect(addTaskState["todolistId1"].length).toBe(3)
    expect(addTaskState["todolistId2"][0].title).toBe("New Task")


});
test("ChangeStatus", () => {

    const action = changeStatusAC("2", TaskStatuses.New, "todolistId2")
    const changeStatusState = tasksReducer(startState, action)

    expect(changeStatusState["todolistId2"][1].status).toBe(TaskStatuses.New)
    expect(changeStatusState["todolistId2"][0].status).toBe(TaskStatuses.Completed)


})
test("ChangeTitle", () => {


    const action = changeTitleAC("3", "JS", "todolistId2")
    const AddTodolistState = tasksReducer(startState, action)

    expect(AddTodolistState["todolistId2"][2].title).toBe("JS")
    expect(AddTodolistState["todolistId2"][1].title).toBe("HTML")
    expect(AddTodolistState["todolistId2"].find(f => f.title === "JS")).toEqual({
        "id": "3",
        "title": "JS",status:TaskStatuses.Completed,todoListId:"todolistId2",
        description:"",startDate:"",deadline:"",addedDate:"",order:0, priority:TaskPriorities.Low,
        completed:false
    })


});
test("AddTodolist", () => {

    const action = AddTodolistAC("New Todolist")
    const addTodolistState = tasksReducer(startState, action)

    const keys = Object.keys(addTodolistState)
    const newKey = keys.find(f => f !== "todolistId1" && f !== "todolistId2")
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3)
    expect(addTodolistState[newKey]).toEqual([])


})

test('property with todolistId should be deleted', () => {

    const action = RemoveTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

