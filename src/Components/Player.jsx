import { useState } from "react"

export default function Player({initialName, symbol, isActive, onChangeName}) {
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick(){
        // console.log(isEditing);
        if(isEditing){
            setIsEditing(false)
            onChangeName(symbol, playerName)
        } else {
            setIsEditing(true)
        }
    }

    function handleChange(event) {
        console.log(event);
        setPlayerName(event.target.value)
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>
    let buttonCaption = 'Edit';

    if(isEditing){
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>
        buttonCaption = "Save"
    } else {
        buttonCaption = "Edit"
        editablePlayerName = <span className="player-name">{playerName}</span>
    }

    return <>
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{buttonCaption}</button>
        </li>
    </>
}