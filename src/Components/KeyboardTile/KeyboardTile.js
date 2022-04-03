import React from "react";
import './KeyboardTile.css';

const successCol="#4fa847", partialCol="#d2cd28", failCol="#787c7e";

function KeyboardTile(props){
    let ind=props.content.charCodeAt(0)-65;
    const [textCol, setTextCol]=React.useState("black");
    const [currColour, setCurrColour] = React.useState("#d3d6da");
    if(props.currAction==="Enter"){
        setTimeout(()=>{
        if(props.colours[ind]===successCol || props.colours[ind]===failCol || props.colours[ind]===partialCol) setTextCol("white");
        setCurrColour(props.colours[ind]);
    }, 1600);
    }
    
    return(
        <button className={"keyboard-tile" + (props.gameMessageState ? "" : " interactive-icon")} onClick={props.onClick} style={{backgroundColor: currColour}}>
            <h2 style={{color: textCol}}>{props.content}</h2>
        </button>
    );
}

export default KeyboardTile;