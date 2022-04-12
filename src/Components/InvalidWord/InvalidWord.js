import React from "react";
import "./InvalidWord.css";

function InvalidWord(props){
    return(
        <div className={"invalid-tile " + props.className + (props.darkModeState ? " light" : " dark")}>
            <h4>Not in word list</h4>
        </div>
    );
}

export default InvalidWord;