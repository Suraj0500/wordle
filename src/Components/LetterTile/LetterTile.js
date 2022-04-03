import React from "react";
import './LetterTile.css';

const successCol="#4fa847", partialCol="#d2cd28", failCol="#787c7e";

function LetterTile(props){
    React.useEffect(()=>{
        if(props.informationState[0]){
            return;
        }
        if(props.content>="A" && props.content<="Z" && props.workingIndex-1===props.id && props.currAction==="letter"){
            document.getElementById(props.id).classList.add("pop-tile-grow");
            document.getElementById(props.id).classList.add("border-tile");
            setTimeout(()=>{
                document.getElementById(props.id).classList.remove("pop-tile-grow");
            }, 100);
        }
        else if(props.workingIndex===props.id && props.currAction==="Back"){
            document.getElementById(props.id).classList.add("pop-tile-reduce");
            document.getElementById(props.id).classList.remove("border-tile");
            setTimeout(()=>{
                document.getElementById(props.id).classList.remove("pop-tile-reduce");
            }, 100);
        }
    });
    const [textCol, setTextCol]=React.useState("black");
    const [currColour, setCurrColour] = React.useState("white");
    setTimeout(()=>{
        if(props.colour===successCol || props.colour===failCol || props.colour===partialCol) setTextCol("white");
        setCurrColour(props.colour);
    }, 300*((props.id%5)+1));
    return(
        <div id={props.id} className="tile" style={{backgroundColor: currColour}}>
            <h1 style={{color: textCol}}>{props.content}</h1>
        </div>
    );
    
}

export default LetterTile;