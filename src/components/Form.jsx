import React from "react"
import { useState } from "react";

function Form({onSubmit}) {
    const [note, setNote] = useState('');

    const handleChange = (event) => {
        const note  = event.target.value;
        setNote(note)
        console.log(note);
    }
    return (
        <React.Fragment>
        <div>
            <form onSubmit={onSubmit}>
                <textarea name="note" id="note" value={note} onChange={handleChange}></textarea>
                <input type="submit" value="Добавить" />
            </form>
        </div>
        </React.Fragment>
    )
}
export default Form;
