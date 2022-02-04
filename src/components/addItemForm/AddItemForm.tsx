import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@material-ui/core";


type AddItemFormType = {
    addItem: (title: string) => void
    disabled?:boolean

}

const AddItemForm = React.memo(({addItem,disabled=false}: AddItemFormType) => {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if (title.trim() !== "") {
            addItem(title)
            setTitle("")
        } else {
            return setError("Title is required")
        }
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addTask()
        }
    }
    return (
        <div>

            <TextField
                label="Type value..."
                variant="outlined"
                defaultValue="Hello World"
                error={!!error}
                helperText={error}
                value={title} onChange={onChangeInputHandler}
                onKeyPress={onKeyPressHandler}
                disabled={disabled}
            />

            <Button onClick={addTask} variant="contained" disabled={disabled}>add</Button>


        </div>

    )
})

export default AddItemForm;