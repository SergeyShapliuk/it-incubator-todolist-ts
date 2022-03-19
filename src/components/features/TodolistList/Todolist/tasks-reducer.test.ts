import tasksReducer, {addTaskAC, deleteTasksTC, getTasksTC, updateTaskAC} from "./tasks-reducer";
import {AddTodolistAC, GetTodolistAC, RemoveTodolistAC} from "./todolist-reducer";

import {TaskPriorities, TaskStatuses} from "../../../../api/todolist-task-api";
import {TasksStateType} from "../../../app/App";

let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                description: "",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                completed: false
            },
            {
                id: "2",
                title: "HTML",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                description: "",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                completed: false
            },
            {
                id: "3",
                title: "HTML",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                description: "",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                completed: false
            },
        ],
        "todolistId2": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                description: "",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                completed: false
            },
            {
                id: "2",
                title: "HTML",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                description: "",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                completed: false
            },
            {
                id: "3",
                title: "HTML",
                status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                description: "",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                completed: false
            },

        ]
    }

});
test("RemoveTask", () => {
    const action = deleteTasksTC.fulfilled({taskId:"2", todolistId:"todolistId2"},'requestId',{taskId:"2", todolistId:"todolistId2"})
    const removeTaskState = tasksReducer(startState, action)

    expect(removeTaskState["todolistId1"].length).toBe(3)
    expect(removeTaskState["todolistId2"].length).toBe(2)
    expect(removeTaskState["todolistId2"].every(t=>t.id !=="2")).toBeTruthy()


});
test("addTask", () => {

    const task= {
        id: "id exist",
        title: "New Task",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
        completed: false
    }
    const action=addTaskAC(task)
    const addTaskState = tasksReducer(startState, action)

    expect(addTaskState["todolistId2"].length).toBe(4)
    expect(addTaskState["todolistId1"].length).toBe(3)
    expect(addTaskState["todolistId2"][0].title).toBe("New Task")
    expect(addTaskState["todolistId2"][0].id).toBeDefined()
    expect(addTaskState["todolistId2"][0].status).toBe(TaskStatuses.New)


});
test("ChangeStatus", () => {

    const action = updateTaskAC({id:"2", model:{status:TaskStatuses.New},todolistId:"todolistId2"})
    const changeStatusState = tasksReducer(startState, action)

    expect(changeStatusState["todolistId2"][1].status).toBe(TaskStatuses.New)
    expect(changeStatusState["todolistId2"][0].status).toBe(TaskStatuses.Completed)


})
test("ChangeTitle", () => {


    const action = updateTaskAC({id:"3", model:{title:"JS"}, todolistId:"todolistId2"})
    const AddTodolistState = tasksReducer(startState, action)

    expect(AddTodolistState["todolistId2"][2].title).toBe("JS")
    expect(AddTodolistState["todolistId2"][1].title).toBe("HTML")
    expect(AddTodolistState["todolistId2"].find(f => f.title === "JS")).toEqual({
        "id": "3",
        "title": "JS", status: TaskStatuses.Completed, todoListId: "todolistId2",
        description: "", startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low,
        completed: false
    })


});
test("AddTodolist", () => {

    const action = AddTodolistAC({todolist:{
     id:"blabla",
     title:"new todolist",
     order:0,
     addedDate:""
    }})
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

    const action = RemoveTodolistAC({todolistId:"todolistId2"});

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
test('empty array should be when we set todolist', () => {
    let action = GetTodolistAC({todolists:[
        {
            id: 'todolistId1', title: "What to learn", addedDate: "",
            order: 0
        },
        {
            id: 'todolistId2', title: "What to buy", addedDate: "",
            order: 0
        }
    ]})

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState["todolistId1"]).toStrictEqual([]);
    expect(endState["todolistId2"]).toStrictEqual([]);
});
test('tasks should be added fot todolist', () => {
    let action = getTasksTC.fulfilled({tasks:startState["todolistId1"],todolistId: "todolistId1"},'requestId',"todolistId1")

    const endState = tasksReducer({"todolistId1": [], "todolistId2": []}, action)


    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(0);

});

