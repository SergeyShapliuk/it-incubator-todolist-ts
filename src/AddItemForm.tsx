import React, {ChangeEvent, KeyboardEvent, useState} from "react";


type AddItemFormType = {
    addItem:(title:string)=>void

}

function AddItemForm(props:AddItemFormType) {

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
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }
    return (
        <div>

            <input value={title} onChange={onChangeInputHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}/>
            <button onClick={addTask}>+</button>
            {error && <div className={"error_message"}>{error}</div>}

        </div>

    )
}

export default AddItemForm;