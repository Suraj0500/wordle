import React from "react";
import "./PlayingBoard.css";
import LetterTile from "../LetterTile/LetterTile.js";
import KeyboardTile from "../KeyboardTile/KeyboardTile.js";
import KeyboardTileBig from "../KeyboardTileBig/KeyboardTileBig.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import words from "an-array-of-english-words";

let fiveLetterWords=[];
for(let i=0;i<words.length;i++){
    if(words[i].length===5) fiveLetterWords.push(words[i]);
}
let randomIndex=Math.floor(Math.random()*fiveLetterWords.length);
let answer=fiveLetterWords[randomIndex];
let gameWon=false;
const successCol="#538d4e", partialCol="#c9b458", failCol="#787c7e";
console.log(answer);



function PlayingBoard(props){
    const [letters, setLetters] = React.useState(Array.from(Array(6), () => new Array(5)));
    const [colours, setColours] = React.useState(Array.from(Array(6), () => new Array(5)));
    const [nextIndex, setNextIndex] = React.useState(0);
    const [letterIndex, setLetterIndex] = React.useState(0);
    const [lastAction, setLastAction] = props.lastAction;
    let keyboardCol=Array.from(Array(26), () => "#d3d6da");
    const [keyboardColours, setKeyboardColours] = React.useState(keyboardCol);
    const numArray=[0, 1, 2, 3, 4];
    const keyboardLayout=["QWERTYUIOP".split(''), "ASDFGHJKL".split(''), "ZXCVBNM".split('')];

    function performCheckWithAnswer(currWord, nextIndex){
        let temp=colours;
        let usedCurr=[false, false, false, false, false];
        let usedAns=[false, false, false, false, false];
        let tempKeyboardColours=keyboardColours;
        for(let i=0;i<5;i++){
            let ind=currWord.toUpperCase().charCodeAt(i)-65;
            if(currWord[i]===answer[i]){
                temp[nextIndex][i]=successCol;
                usedAns[i]=true;
                usedCurr[i]=true;
                tempKeyboardColours[ind]=successCol;
            }
        }
        for(let i=0;i<5;i++){
            let ind=currWord.toUpperCase().charCodeAt(i)-65;
            for(let j=0;j<5;j++){
                if(currWord[i]===answer[j] && !usedCurr[i] && !usedAns[j]){
                    temp[nextIndex][i]=partialCol;
                    usedCurr[i]=true;
                    usedAns[j]=true;
                    if(tempKeyboardColours[ind]===successCol) continue;
                    else tempKeyboardColours[ind]=partialCol;
                }
            }
        }
        for(let i=0;i<5;i++){
            let ind=currWord.toUpperCase().charCodeAt(i)-65;
            if(!usedCurr[i]){
                temp[nextIndex][i]=failCol;
                if(tempKeyboardColours[ind]===successCol || tempKeyboardColours[ind]===partialCol) continue;
                else tempKeyboardColours[ind]=failCol;
            }
        }
        setColours(temp);
        setKeyboardColours(tempKeyboardColours);
        let count=0;
        for(let i=0;i<5;i++){
            if(colours[nextIndex][i]===successCol) count++;
        }
        let base=nextIndex*5;
        let timeForNext=300;
        document.getElementById(base).classList.add("flip");
        setTimeout(()=>{
            document.getElementById(base).classList.remove("flip");
            document.getElementById(base).classList.remove("border-tile");
            document.getElementById(base).classList.add("transparent-border");
            document.getElementById(base+1).classList.add("flip");
            setTimeout(()=>{
                document.getElementById(base+1).classList.remove("flip");
                document.getElementById(base+1).classList.remove("border-tile");
                document.getElementById(base+1).classList.add("transparent-border");
                document.getElementById(base+2).classList.add("flip");
                setTimeout(()=>{
                    document.getElementById(base+2).classList.remove("flip");
                    document.getElementById(base+2).classList.remove("border-tile");
                    document.getElementById(base+2).classList.add("transparent-border");
                    document.getElementById(base+3).classList.add("flip");
                    setTimeout(()=>{
                        document.getElementById(base+3).classList.remove("flip");
                        document.getElementById(base+3).classList.remove("border-tile");
                        document.getElementById(base+3).classList.add("transparent-border");
                        document.getElementById(base+4).classList.add("flip");
                        setTimeout(()=>{
                            document.getElementById(base+4).classList.remove("flip");
                            document.getElementById(base+4).classList.remove("border-tile");
                            document.getElementById(base+4).classList.add("transparent-border");
                        }, timeForNext);
                    }, timeForNext);
                }, timeForNext);
            }, timeForNext);
        }, timeForNext);
        return count===5;
    }
    
    
    
    function checkValidity(currWord){
        for(let i=0;i<fiveLetterWords.length;i++){
            if(currWord===fiveLetterWords[i]) return true;
        }
        return false;
    }
    
    
    
    
    function handleInput(letter){
        if(nextIndex===6){
            alert("Please refresh page to play again.");
            return;
        }
        if(letter==="BACK" || letter==="BACKSPACE"){
            if(letterIndex===0) return;
            setLastAction("Back");
            let tempLetters=letters;
            tempLetters[nextIndex][letterIndex-1]="";
            setLetters(tempLetters);
            setLetterIndex(letterIndex-1);
        }
        else if(letter==="ENTER"){
            if(letterIndex!==5) return;
            setLastAction("Enter");
            const currWord=letters[nextIndex].join("").toLowerCase();
            const isValid=checkValidity(currWord);
            if(isValid){
                gameWon=performCheckWithAnswer(currWord, nextIndex);
                if(gameWon){
                    setNextIndex(6);
                    setTimeout(()=>{
                        alert("Good Job, you are a pro.");
                        alert("Polish your skills by refreshing page.");
                    }, 2000);
                } 
                else{
                    if(nextIndex===5){
                        setTimeout(()=>{
                            alert('The Answer was "' + answer + '"');
                            alert("Nice try, better luck next time.");
                            alert("Refresh page to try again.");
                        }, 2000);
                    }
                    setNextIndex(nextIndex+1);
                } 
                document.getElementById("mainInput").type="hidden";
                setTimeout(()=>{
                    document.getElementById("mainInput").type="text";
                    document.getElementById("mainInput").focus();
                }, 1600);
                setLetterIndex(0);
            }
            else{
                alert("Word Not in Dictionary, Please Enter Valid Word.");
            }
        }
        else if(letter.length===1 && letter>='A' && letter<='Z'){
            if(letterIndex===5) return;
            setLastAction("letter");
            let tempLetters=letters;
            tempLetters[nextIndex][letterIndex]=letter;
            setLetters(tempLetters);
            setLetterIndex(letterIndex+1);
        }
        
    }

    return(
        <div>
            <div className="playing-board-container">
                {[...numArray, 5].map(firstIndex=>
                    [...numArray].map(secondIndex=>
                        <LetterTile currAction={lastAction} workingIndex={nextIndex*5 + letterIndex}id={(firstIndex*5) + secondIndex} content={letters[firstIndex][secondIndex]} colour={colours[firstIndex][secondIndex]} informationState={props.informationState} />))} 

            </div>

            <div className="keyboard-container">
                <div className="keyboard-row-1">
                    {keyboardLayout[0].map(letter=>
                        <KeyboardTile colours={keyboardColours} content={letter} onClick={()=>{handleInput(letter)}} currAction={lastAction}/>)}
                </div>


                <div className="keyboard-row-2">
                    {keyboardLayout[1].map(letter=>
                        <KeyboardTile colours={keyboardColours} content={letter} onClick={()=>{handleInput(letter)}} currAction={lastAction}/>)}
                </div>
                

                <div className="keyboard-row-3">
                    <KeyboardTileBig content="ENTER" onClick={()=>{handleInput("ENTER")}}/>

                    {keyboardLayout[2].map(letter=>
                        <KeyboardTile colours={keyboardColours} content={letter} onClick={()=>{handleInput(letter)}} currAction={lastAction}/>)}
                    
                    <KeyboardTileBig content={<FontAwesomeIcon icon={faDeleteLeft} size="xl" />} onClick={()=>{handleInput("BACK")}}/>
                </div>
            </div>
            {props.informationState[0]===false ? (
                <div>
                    <input  unselectable="on"
                        onMouseDown={()=>{return false}}
                        role="presentation" autoComplete="off" id="mainInput" type="text" autoFocus onBlur={({target})=>{target.focus()}} onKeyDown={(e)=>{
                        handleInput(e.key.toUpperCase());
                        }} />
                    <div className="for-information"></div>
                </div>
            ) : <div className="for-information fade-in"></div>}
        </div>    
    );
}


export default PlayingBoard;