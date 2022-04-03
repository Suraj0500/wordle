import React from "react";
import './KeyboardTileBig.css';

function KeyboardTileBig(props){
    return(
        <button className={"keyboard-tile-big" + (props.gameMessageState ? "" : " interactive-icon")} onClick={props.onClick}>
            <h2>{props.content}</h2>
        </button>
    );
}

export default KeyboardTileBig;