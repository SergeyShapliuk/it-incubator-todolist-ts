import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type FilterValueType = "all" | "active" | "completed"


function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: false},
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "HTML", isDone: false},
        {id: v1(), title: "HTML", isDone: true}
    ])

    function removeTask(id: string) {
        tasks = tasks.filter(f => f.id !== id)
        setTasks(tasks)

    }

    let [filter, setFilter] = useState<FilterValueType>("all")
    let taskForTodolist = tasks
    if (filter === "active") {
        taskForTodolist = tasks.filter(f => f.isDone)
    }
    if (filter === "completed") {
        taskForTodolist = tasks.filter(f => !f.isDone)
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value)

    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }
function changeStatus(id:string,isDone:boolean){
        let task=tasks.find(f=>f.id===id)
    if(task){
        task.isDone=isDone
        setTasks([...tasks])
    }


}
    return (
        <div className="App">


            <Todolist title={"What to learn"}
                      removeTask={removeTask}
                      tasks={taskForTodolist}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
            filter={filter}/>


        </div>
    );
}

export default App;




