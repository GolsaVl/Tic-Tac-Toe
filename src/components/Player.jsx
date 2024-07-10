import { useState } from "react";

export default function Player({ player_name, player_icon, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerNewName, setPlayerName] = useState(player_name);

  function handleEditClick() {
    setIsEditing((state) => !state);
  }

  function handleNameChange(event) {
    setPlayerName(event.target.value);
  }

  let pleyerName = <span className="player-name">{playerNewName}</span>;

  if (isEditing) {
    pleyerName = (
      <input
        type="text"
        required
        value={playerNewName}
        onChange={handleNameChange}
      />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {pleyerName}
        <span className="player-symbol">{player_icon}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "save" : "edit"}</button>
    </li>
  );
}
