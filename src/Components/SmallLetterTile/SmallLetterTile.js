import React from "react";
import "./SmallLetterTile.css";

function SmallLetterTile(props){
    const [tileCol, setTileCol] = React.useState("white");
    const [fontCol, setFontCol] = React.useState("black");
    React.useEffect(()=>{
        if(props.flip===true && props.informationState===true){
            document.getElementById(props.id).classList.add("flip");
            setTimeout(()=>{
                document.getElementById(props.id).classList.remove("flip");
                setTileCol(props.colour);
                setFontCol("white");
            }, 200);
        }
    })
    return(
        <div id={props.id} className="small-letter-container" style={{backgroundColor:tileCol}}>
            <h1 style={{color: fontCol}}>{props.content}</h1>
        </div>
    );
}

export default SmallLetterTile;