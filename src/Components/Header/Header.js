import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle, faArrowsRotate, faMoon } from "@fortawesome/free-solid-svg-icons";
import "./Header.css"

function Header(props){
    const [isDarkMode, setIsDarkMode] = props.darkModeState;
    const setLastAction = props.lastAction[1];
    const buttonActive = props.buttonState;
    return(
        <div className={"header-container " + (isDarkMode ? "dark" : "light")}>
            <div className="header-icon">
                <FontAwesomeIcon icon={faQuestionCircle} size={Math.min(window.innerHeight, window.innerWidth)<315 ? "lg" : "xl"} className={props.gameMessageState ? "" : "interactive-icon"} onClick={()=>{if(buttonActive && !props.gameMessageState){
                                                                                                                                                                                                                props.informationState[1](true);
                                                                                                                                                                                                            }}}/>
            </div>
            <div className="header-icon" style={{color: isDarkMode ? "#121213" : "white"}}>
                <FontAwesomeIcon icon={faQuestionCircle} size={Math.min(window.innerHeight, window.innerWidth)<315 ? "lg" : "xl"} />
            </div>
            <div className="title">
                <h1>Wordle</h1>
            </div>
            <div className="header-icon">
                <FontAwesomeIcon icon={faMoon} size={Math.min(window.innerHeight, window.innerWidth)<315 ? "lg" : "xl"} className={props.gameMessageState ? "" : "interactive-icon"} 
                                                                                            onClick={()=>{
                                                                                                if(buttonActive && !props.gameMessageState){
                                                                                                    setIsDarkMode(!isDarkMode);
                                                                                                    setLastAction("");
                                                                                                }
                                                                                                }}/>
            </div>
            <div className="header-icon">
                <FontAwesomeIcon icon={faArrowsRotate} size={Math.min(window.innerHeight, window.innerWidth)<315 ? "lg" : "xl"} className={props.gameMessageState ? "" : "interactive-icon"} onClick={()=>{if(props.gameMessageState===false) window.location.reload(false);}}/>
            </div>
        </div>
    );
}

export default Header;