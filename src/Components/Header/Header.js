import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle, faArrowsRotate, faMoon } from "@fortawesome/free-solid-svg-icons";
import "./Header.css"

function Header(props){
    console.log(Math.min(window.innerHeight, window.innerWidth));
    return(
        <div className="header-container">
            <div className="hint">
                <FontAwesomeIcon icon={faQuestionCircle} size={Math.min(window.innerHeight, window.innerWidth)<315 ? "" : "xl"} className={props.gameMessageState ? "" : "interactive-icon"} onClick={()=>{if(props.gameMessageState===false) props.informationState[1](true)}}/>
            </div>
            <div className="title">
                <h1>Wordle</h1>
            </div>
            {/* <div className="dark-mode">
                <FontAwesomeIcon icon={faMoon} size="xl" className="interactive-icon" onClick={()=>{
                                                                                            setIsDarkMode(!isDarkMode);
                                                                                            localStorage.setItem("darkMode", isDarkMode);}}/>
            </div> */}
            <div className="refresh">
                <FontAwesomeIcon icon={faArrowsRotate} size={Math.min(window.innerHeight, window.innerWidth)<315 ? "" : "xl"} className={props.gameMessageState ? "" : "interactive-icon"} onClick={()=>{if(props.gameMessageState===false) window.location.reload(false);}}/>
            </div>
        </div>
    );
}

export default Header;