import {TasksStateType} from "../../../app/AppExample";
import todolistReducer, {AddTodolistAC, TodolistDomainType} from "./todolist-reducer";
import tasksReducer from "./tasks-reducer";

test('id`s should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = AddTodolistAC({todolist:{
        title:"new title",
        id:"",
        addedDate:"",
        order:0
    }});

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.addedDate);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});
