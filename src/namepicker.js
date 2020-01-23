import React, {useState, useRef} from 'react'
import { FiEdit, FiSave } from "react-icons/fi"

function NamePicker(props){
    const [name, setName] = useState('')
    const [showName, setShowName] = useState(false)
    const inputEl = useRef(null)
    return <div className = "edit-username">
        <input value = {name} ref = {inputEl}
            className = "name-input"
            style={{display:showName ? "none" : "flex"}}
            onChange={e=> setName(e.target.value)}
            onKeyPress={e => {
                if(e.key === "Enter") props.onSave(name)
            }}
        />
        {showName && <div>{name}</div>}
        <button onClick = {() => {
            inputEl.current.focus()
            if(name) props.onSave(name)
            setShowName(!showName)
        }} className = "name-button">
            {showName ? <FiEdit /> : <FiSave />}
        </button>
        
    </div>
}

export default NamePicker