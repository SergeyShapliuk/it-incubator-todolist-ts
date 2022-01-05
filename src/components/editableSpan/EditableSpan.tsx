import React, {ChangeEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {Edit} from "@material-ui/icons";

type EditableSpanPropsType = {

    title: string
    onChange: (newTitle: string) => void
}

const EditableSpan=React.memo((props: EditableSpanPropsType)=> {
    console.log('EditableSpan is called')
    let [editMode, seEditMode] = useState(false)
    let [title, setTitle] = useState("")


    let activeEditMode = () => {
        seEditMode(true)
        setTitle(props.title)
    }
    let activeViewMode = () => {
        seEditMode(false)
        props.onChange(title)
    }
    let onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField value={title} onChange={onChangeTitleHandler} onBlur={activeViewMode} autoFocus/>
        : <span onDoubleClick={activeEditMode}>{props.title}
            <IconButton size={"small"}>
            <Edit/>
        </IconButton>
            </span>

})

export default EditableSpan;
