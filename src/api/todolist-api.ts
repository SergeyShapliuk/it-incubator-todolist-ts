import axios from "axios";


const instant=axios.create({
    withCredentials:true,
    baseURL:'https://social-network.samuraijs.com/api/1.1',
    headers:{
        'API-KEY':'d63defdb-0459-40a2-9e7d-c1b6f429e0a6'
    }
});

export const todolistApi={
    getTodolist(){
        return instant.get('/todo-lists')
            .then(response=>response.data)
    },
    createTodolist(title:string){
        return instant.post('/todo-lists',{title})
            .then(response=>response.data)
    },
    updateTodolist(todolistId:string,title:string){
       return  instant.put('/todo-lists/'+todolistId,{title})
            .then(response=>response.data)
    },
    deleteTodolist(todolistId:string){
        return instant.delete('/todo-lists/'+todolistId)
            .then(response=>response.data)
    }
};

