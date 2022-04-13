import React from "react";
import './LetterTile.css';

const successColLight="#4fa847", partialColLight="#d2cd28", failColLight="#787c7e";
const successColDark="#538d4e", partialColDark="#b59f3b", failColDark="#3a3a3c";
const bgLight="white", bgDark="#121213";

function LetterTile(props){
    React.useEffect(()=>{
        if(props.informationState[0]){
            return;
        }
        if(props.content>="A" && props.content<="Z" && props.workingIndex-1===props.id && props.currAction==="letter"){
            document.getElementById(props.id).classList.add("pop-tile-grow");
            document.getElementById(props.id).classList.add(props.darkModeState ? "border-tile-dark" : "border-tile-light");
            setTimeout(()=>{
                document.getElementById(props.id).classList.remove("pop-tile-grow");
            }, 100);
        }
        else if(props.workingIndex===props.id && props.currAction==="Back"){
            document.getElementById(props.id).classList.add("pop-tile-reduce");
            document.getElementById(props.id).classList.remove("border-tile-light");
            document.getElementById(props.id).classList.remove("border-tile-dark");
            setTimeout(()=>{
                document.getElementById(props.id).classList.remove("pop-tile-reduce");
            }, 100);
        }
    });
    const [tileColour, setTileColour] = React.useState("");
    const [fontColour, setFontColour] = React.useState("");
    const [borderClass, setBorderClass] = React.useState("");
    if(borderClass!=="transparent-border"){
        if(!props.gameWon && Math.floor((props.id)/5)===Math.floor((props.workingIndex-1)/5)){
            if(borderClass==="") setBorderClass("border-tile-dark");
            if(props.darkModeState && borderClass==="border-tile-light") setBorderClass("border-tile-dark");
            if(!props.darkModeState && borderClass==="border-tile-dark") setBorderClass("border-tile-light");
        }
        else{
            if(borderClass==="") setBorderClass("border-tile-pre-light");
            if(props.darkModeState && borderClass==="border-tile-pre-light") setBorderClass("border-tile-pre-dark");
            if(!props.darkModeState && borderClass==="border-tile-pre-dark") setBorderClass("border-tile-pre-light");
        }
    }
    
    
    if(props.colour===""){
        setTileColour(props.darkModeState ? bgDark : bgLight);
        setFontColour(props.darkModeState ? "white" : "black");
    } 
    if(props.colour!==tileColour) {
        if(tileColour===successColDark || tileColour===successColLight || tileColour===partialColDark || tileColour===partialColLight || tileColour===failColDark || tileColour===failColLight){
            setTileColour(props.colour);
        } 
        else if(props.colour===successColDark || props.colour===successColLight || props.colour===partialColDark || props.colour===partialColLight || props.colour===failColDark || props.colour===failColLight){
            setTimeout(()=>{
                setBorderClass("transparent-border");
                setTileColour(props.colour);
                setFontColour("white");
            }, 300*((props.id%5)+1));
        }
        else{
            setTileColour(props.colour);
        } 
    }
    return(
        <div id={props.id} className={"tile " + borderClass} style={{backgroundColor: tileColour}}>
            <h1 style={{color:fontColour}}>{props.content}</h1>
        </div>
    );
    
}

export default LetterTile;