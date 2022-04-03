import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import SmallLetterTile from "../SmallLetterTile/SmallLetterTile.js";
import "./Information.css";

const successCol="#4fa847", partialCol="#d2cd28", failCol="#787c7e", defaultCol="white";

function Information(props){
    return(
        <div className={props.informationState[0] ? "information-container visible" : "information-container invisible"}>
            <div className="information-header">
                <h1>HOW TO PLAY</h1>
                <FontAwesomeIcon icon={faXmark} size="2x" className="cross" onClick={()=>{
                                                                            props.informationState[1](false);
                                                                            props.lastAction[1]("");}} />
            </div>
            <hr />
            <h2>Guess the Wordle in six tries.</h2>
            <p>Each guess must be a valid five-letter word. Hit the enter button to submit.</p>
            <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
            <hr />
            <h3>Examples</h3>
            <div className="information-word">
                <SmallLetterTile id="small-0" content="W" flip={true} colour={successCol} informationState={props.informationState[0]}/>
                <SmallLetterTile id="small-1" content="E" flip={false} colour={defaultCol} />
                <SmallLetterTile id="small-2" content="A" flip={false} colour={defaultCol} />
                <SmallLetterTile id="small-3" content="R" flip={false} colour={defaultCol} />
                <SmallLetterTile id="small-4" content="Y" flip={false} colour={defaultCol} />
            </div>
            <p>The letter 'W' is in the word and in the correct spot.</p>
            <div className="information-word">
                <SmallLetterTile id="small-5" content="P" flip={false} colour={defaultCol} />
                <SmallLetterTile id="small-6" content="I" flip={true} colour={partialCol} informationState={props.informationState[0]}/>
                <SmallLetterTile id="small-7" content="L" flip={false} colour={defaultCol} />
                <SmallLetterTile id="small-8" content="L" flip={false} colour={defaultCol} />
                <SmallLetterTile id="small-9" content="S" flip={false} colour={defaultCol} />
            </div>
            <p>The letter 'I' is in the word but in the wrong spot.</p>
            <div className="information-word">
                <SmallLetterTile id="small-10" content="V" flip={false} colour={defaultCol} />
                <SmallLetterTile id="small-11" content="A" flip={false} colour={defaultCol} />
                <SmallLetterTile id="small-12" content="G" flip={false} colour={defaultCol} />
                <SmallLetterTile id="small-13" content="U" flip={true} colour={failCol} informationState={props.informationState[0]}/>
                <SmallLetterTile id="small-14" content="E" flip={false} colour={defaultCol} />
            </div>
            <p>The letter 'U' is not in the word in any spot.</p>
            <hr />
            <p>Don't worry, if the word is too hard for you or you just want to play again, it can always be changed using the <FontAwesomeIcon icon={faArrowsRotate}/> button.</p>
        </div>
    );
}

export default Information;