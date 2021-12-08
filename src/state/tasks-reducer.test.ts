import tasksReducer, {addTaskAC, changeStatusAC, changeTitleAC, removeTaskAC} from "./tasks-reducer";
import {AddTodolistAC, RemoveTodolistAC} from "./todolist-reducer";
import {TasksStateType} from "../App";


test("RemoveTask", () => {
    let startState = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "HTML", isDone: true},
            {id: "3", title: "HTML", isDone: false},
            {id: "4", title: "HTML", isDone: true}
        ],
        "todolistId2": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "HTML", isDone: true},
            {id: "3", title: "HTML", isDone: false},
            {id: "4", title: "HTML", isDone: true}
        ]
    }


    const action = removeTaskAC("2", "todolistId2")
    const removeTaskState = tasksReducer(startState, action)

    expect(removeTaskState["todolistId1"].length).toBe(4)
    expect(removeTaskState["todolistId2"].length).toBe(3)


});
test("addTask", () => {
    let startState = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "HTML", isDone: true},
            {id: "3", title: "HTML", isDone: false},
            {id: "4", title: "HTML", isDone: true}
        ],
        "todolistId2": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "HTML", isDone: true},
            {id: "3", title: "HTML", isDone: false},
            {id: "4", title: "HTML", isDone: true}
        ]
    }


    const action = addTaskAC("New Task", "todolistId2")
    const addTaskState = tasksReducer(startState, action)

    expect(addTaskState["todolistId2"].length).toBe(5)
    expect(addTaskState["todolistId1"].length).toBe(4)
    expect(addTaskState["todolistId2"][0].title).toBe("New Task")


});
test("ChangeStatus", () => {
    let startState = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "HTML", isDone: true},
            {id: "3", title: "HTML", isDone: false},
            {id: "4", title: "HTML", isDone: true}
        ],
        "todolistId2": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "HTML", isDone: true},
            {id: "3", title: "HTML", isDone: false},
            {id: "4", title: "HTML", isDone: true}
        ]
    }


    const action = changeStatusAC("2", false, "todolistId2")
    const changeStatusState = tasksReducer(startState, action)

    expect(changeStatusState["todolistId2"][1].isDone).toBe(false)
    expect(changeStatusState["todolistId2"][0].isDone).toBe(false)


})
test("ChangeTitle", () => {
    let startState = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "HTML", isDone: true},
            {id: "3", title: "HTML", isDone: false},
            {id: "4", title: "HTML", isDone: true}
        ],
        "todolistId2": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "HTML", isDone: true},
            {id: "3", title: "HTML", isDone: false},
            {id: "4", title: "HTML", isDone: true}
        ]
    }


    const action = changeTitleAC("3", "JS", "todolistId2")
    const AddTodolistState = tasksReducer(startState, action)

    expect(AddTodolistState["todolistId2"][2].title).toBe("JS")
    expect(AddTodolistState["todolistId2"][1].title).toBe("HTML")
    expect(AddTodolistState["todolistId2"].find(f => f.title === "JS")).toEqual({
        "id": "3",
        "isDone": false,
        "title": "JS"
    })


});
test("AddTodolist", () => {
    let startState = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "HTML", isDone: true},
            {id: "3", title: "HTML", isDone: false},
            {id: "4", title: "HTML", isDone: true}
        ],
        "todolistId2": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "HTML", isDone: true},
            {id: "3", title: "HTML", isDone: false},
            {id: "4", title: "HTML", isDone: true}
        ]
    }


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
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    };

    const action = RemoveTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

