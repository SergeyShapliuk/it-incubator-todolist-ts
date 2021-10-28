import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {

    title: string
    onChange:(newTitle:string)=>void
}

function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, seEditMode] = useState(false)
    let [title,setTitle]=useState("")


let activeEditMode=()=>{
        seEditMode(true)
    setTitle(props.title)
}
let activeViewMode=()=>{
        seEditMode(false)
    props.onChange(title)
}
let onChangeTitleHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
}

    return  editMode
            ? <input value={title} onChange={onChangeTitleHandler} onBlur={activeViewMode} autoFocus />
            : <span onDoubleClick={activeEditMode} >{props.title}</span>

}
export default EditableSpan;
