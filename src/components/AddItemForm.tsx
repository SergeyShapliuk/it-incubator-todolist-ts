import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@material-ui/core";


type AddItemFormType = {
    addItem: (title: string) => void

}

const AddItemForm = React.memo((props: AddItemFormType) => {
    console.log('AddItemForm is called')

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim())
            setTitle("")
        } else {
            return setError("Title is required")
        }
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
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
            />

            <Button onClick={addTask} variant="contained">add</Button>


        </div>

    )
})

export default AddItemForm;