import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import EditableSpan from "../editableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {PropsTaskType} from "../todolist/Todolist";

type TaskPropType = {
    removeTask: (id: string, todolistId: string) => void
    changeTitle: (id: string, newTitle: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    todolistId: string
    task: PropsTaskType
}
export const Task = React.memo((props: TaskPropType) => {

    const onClickHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    }
    const onChangeTitleHandler = useCallback((newTitle: string) => {
        props.changeTitle(props.task.id, newTitle, props.todolistId)
    },[ props.changeTitle,props.task.id,props.todolistId])
    return <ListItem key={props.task.id} className={props.task.isDone ? "is_done" : ""}><Checkbox defaultChecked
                                                                                             color="primary"
                                                                                             checked={props.task.isDone}
                                                                                             onChange={onChangeStatusHandler}/>
        <span><EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/></span>
        <IconButton>
            <Delete onClick={onClickHandler}/>
        </IconButton>
    </ListItem>


})