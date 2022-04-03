import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./GameOver.css";

function GameOver(props){
    const [isGameMessageVisible, setIsGameMessageVisible] = props.gameMessageState;
    return (
        <div className={isGameMessageVisible ? "game-message-container visible" : "game-message-container invisible"}>
            <FontAwesomeIcon icon={faCircleXmark} size="2x" className="game-message-cross" onClick={()=>{
                                                                            setIsGameMessageVisible(false);
                                                                            props.lastAction[1]("");}} />
            <h2 className="game-message-content">{props.gameMessage[0]}</h2>
        </div>
    );
}

export default GameOver;