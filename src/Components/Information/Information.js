import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import SmallLetterTile from "../SmallLetterTile/SmallLetterTile.js";
import "./Information.css";

const successColLight="#4fa847", partialColLight="#d2cd28", failColLight="#787c7e";
const successColDark="#538d4e", partialColDark="#b59f3b", failColDark="#3a3a3c";

function Information(props){
    React.useEffect(()=>{
        localStorage.setItem("firstVisit", false);
    });
    setTimeout(()=>{
        document.getElementById("information-message").style.zIndex=2;
    }, 450);

    
    return(
        <div id="information-message" className={"information-container " + (props.informationState[0] ? "visible" : "invisible") + (props.darkModeState ? " dark" : " light")}>
            <div className="information-header bottom-of-content">
                <h1>HOW TO PLAY</h1>
                <FontAwesomeIcon icon={faXmark} size="2x" className="cross" onClick={()=>{
                                                                            props.informationState[1](false);
                                                                            props.lastAction[1]("");}} />
            </div>
            <h2>Guess the Wordle in six tries.</h2>
            <p>Each guess must be a valid five-letter word. Hit the enter button to submit.</p>
            <p className="bottom-of-content">After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
            <h3>Examples</h3>
            <div className="information-word">
                <SmallLetterTile id="small-0" content="W" darkModeState={props.darkModeState} flip={true} colour={props.darkModeState ? successColDark : successColLight} informationState={props.informationState[0]}/>
                <SmallLetterTile id="small-1" content="E" darkModeState={props.darkModeState} flip={false} />
                <SmallLetterTile id="small-2" content="A" darkModeState={props.darkModeState} flip={false} />
                <SmallLetterTile id="small-3" content="R" darkModeState={props.darkModeState} flip={false} />
                <SmallLetterTile id="small-4" content="Y" darkModeState={props.darkModeState} flip={false} />
            </div>
            <p>The letter 'W' is in the word and in the correct spot.</p>
            <div className="information-word">
                <SmallLetterTile id="small-5" content="P" darkModeState={props.darkModeState} flip={false} />
                <SmallLetterTile id="small-6" content="I" darkModeState={props.darkModeState} flip={true} colour={props.darkModeState ? partialColDark : partialColLight} informationState={props.informationState[0]}/>
                <SmallLetterTile id="small-7" content="L" darkModeState={props.darkModeState} flip={false} />
                <SmallLetterTile id="small-8" content="L" darkModeState={props.darkModeState} flip={false} />
                <SmallLetterTile id="small-9" content="S" darkModeState={props.darkModeState} flip={false} />
            </div>
            <p>The letter 'I' is in the word but in the wrong spot.</p>
            <div className="information-word">
                <SmallLetterTile id="small-10" content="V" darkModeState={props.darkModeState} flip={false} />
                <SmallLetterTile id="small-11" content="A" darkModeState={props.darkModeState} flip={false} />
                <SmallLetterTile id="small-12" content="G" darkModeState={props.darkModeState} flip={false} />
                <SmallLetterTile id="small-13" content="U" darkModeState={props.darkModeState} flip={true} colour={props.darkModeState ? failColDark : failColLight} informationState={props.informationState[0]}/>
                <SmallLetterTile id="small-14" content="E" darkModeState={props.darkModeState} flip={false} />
            </div>
            <p className="bottom-of-content">The letter 'U' is not in the word in any spot.</p>
            <p>Don't worry, if the word is too hard for you or you just want to play again, it can always be changed using the <FontAwesomeIcon icon={faArrowsRotate}/> button.</p>
        </div>
    );
}

export default Information;