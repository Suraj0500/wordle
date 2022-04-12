import React from "react";
import './KeyboardTile.css';


const bgDark="#818384", bgLight="#d3d6da";

function KeyboardTile(props){
    let ind=props.content.charCodeAt(0)-65;
    const [currColour, setCurrColour] = React.useState("");
    const [tileCol, setTileCol] = React.useState("white");
    if(props.colours[ind]===bgLight && tileCol!=="black") setTileCol("black");
    if(props.colours[ind]===bgDark && tileCol==="black") setTileCol("white");
    if(props.currAction==="Enter"){
        setTimeout(()=>{
            setCurrColour(props.colours[ind]);
            setTileCol("white");
        }, 1600);
    }
    else{
        if(props.colours[ind]!==currColour){
            setCurrColour(props.colours[ind]);
        } 
    }
    
    return(
        <button className={"keyboard-tile" + (props.gameMessageState ? "" : " interactive-icon")} onClick={props.onClick} style={{backgroundColor: currColour}}>
            <h2 style={{color: tileCol}}>{props.content}</h2>
        </button>
    );
}

export default KeyboardTile;