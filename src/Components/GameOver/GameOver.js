import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./GameOver.css";

function GameOver(props){
    setTimeout(()=>{
        document.getElementById("game-message").style.zIndex=2;
    }, 450);


    const [isGameMessageVisible, setIsGameMessageVisible] = props.gameMessageState;
    return (
        <div id="game-message" className={"game-message-container " + (isGameMessageVisible ? "visible" : "invisible") + (props.darkModeState ? " dark-game" : " light-game")}>
            <FontAwesomeIcon icon={faCircleXmark} size="2x" className={"game-message-cross " + (props.darkModeState ? "dark-cross" : "light-cross")} onClick={()=>{
                                                                            setIsGameMessageVisible(false);
                                                                            props.lastAction[1]("");}} />
            <h2 className="game-message-content" style={{color: props.darkModeState ? "white" : "black"}}>{props.gameMessage[0]}</h2>
        </div>
    );
}

export default GameOver;