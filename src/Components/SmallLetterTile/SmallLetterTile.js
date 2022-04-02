import React from "react";
import "./SmallLetterTile.css";

function SmallLetterTile(props){
    const isDarkMode=props.darkModeState;
    const [tileCol, setTileCol] = React.useState("white");
    const [fontCol, setFontCol] = React.useState("black");
    if(isDarkMode && tileCol==="white"){
        setTileCol("black");
        setFontCol("white");
    }
    React.useEffect(()=>{
        if(props.flip===true){
            document.getElementById(props.id).classList.add("flip");
            setTimeout(()=>{
                document.getElementById(props.id).classList.remove("flip");
                setTileCol(props.colour);
                setFontCol("white");
            }, 200);
        }
    })
    return(
        <div id={props.id} className="small-letter-container" style={{backgroundColor: tileCol, border: isDarkMode ? "1px solid white" : "1px solid black"}}>
            <h1 style={{color: fontCol}}>{props.content}</h1>
        </div>
    );
}

export default SmallLetterTile;