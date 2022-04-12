import React from "react";
import './KeyboardTileBig.css';

const bgDark="#818384", bgLight="#d3d6da";

function KeyboardTileBig(props){
    return(
        <button className={"keyboard-tile-big" + (props.gameMessageState ? "" : " interactive-icon")} onClick={props.onClick} style={{backgroundColor: props.darkModeState ? bgDark : bgLight}}>
            <h2 style={{color: props.darkModeState ? "white" : "black"}}>{props.content}</h2>
        </button>
    );
}

export default KeyboardTileBig;