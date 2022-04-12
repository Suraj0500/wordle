import React from "react";
import "./SmallLetterTile.css";

const bgLight="white", bgDark="#121213";

function SmallLetterTile(props){
    React.useEffect(()=>{
        if(props.flip===true && props.informationState===true){
            document.getElementById(props.id).classList.add("flip");
            setTimeout(()=>{
                document.getElementById(props.id).classList.remove("flip");
                setTileCol(props.colour);
                setFontCol("white");
            }, 200);
        }
    });
    const [tileCol, setTileCol] = React.useState("");
    const [fontCol, setFontCol] = React.useState("");
    if(props.darkModeState && !props.flip && tileCol!==bgDark){
        setTileCol(bgDark);
        setFontCol("white");
    }
    if(!props.darkModeState && !props.flip && tileCol!==bgLight){
        setTileCol(bgLight);
        setFontCol("black");
    }
    return(
        <div id={props.id} className={"small-letter-container " + (props.flip ? "border-tile-transparent-thin" : (props.darkModeState ? "border-tile-dark-thin" : "border-tile-light-thin"))} style={{backgroundColor:tileCol}}>
            <h1 style={{color: fontCol}}>{props.content}</h1>
        </div>
    );
}

export default SmallLetterTile;