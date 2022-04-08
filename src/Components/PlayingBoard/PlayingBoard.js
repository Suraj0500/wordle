import React from "react";
import "./PlayingBoard.css";
import LetterTile from "../LetterTile/LetterTile.js";
import KeyboardTile from "../KeyboardTile/KeyboardTile.js";
import KeyboardTileBig from "../KeyboardTileBig/KeyboardTileBig.js";
import InvalidWord from "../InvalidWord/InvalidWord.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import dictionary from "../../dictionary.json";
import targetWords from "../../targetWords.json";

const randomIndex=Math.floor(Math.random()*targetWords.length);
const answer=targetWords[randomIndex];
let gameWon=false;
const successCol="#4fa847", partialCol="#d2cd28", failCol="#787c7e";

function PlayingBoard(props){
    const [letters, setLetters] = React.useState(Array.from(Array(6), () => new Array(5)));
    const [colours, setColours] = React.useState(Array.from(Array(6), () => new Array(5)));
    const [nextIndex, setNextIndex] = React.useState(0);
    const [letterIndex, setLetterIndex] = React.useState(0);
    const [isInvalidMessageVisible, setIsInvalidMessageVisible] = React.useState(false);
    const [lastAction, setLastAction] = props.lastAction;
    let keyboardCol=Array.from(Array(26), () => "#d3d6da");
    const [keyboardColours, setKeyboardColours] = React.useState(keyboardCol);
    const numArray=[0, 1, 2, 3, 4];
    const keyboardLayout=["QWERTYUIOP".split(''), "ASDFGHJKL".split(''), "ZXCVBNM".split('')];
    const [isGameMessageVisible, setIsGameMessageVisible] = props.gameMessageState;
    const [gameMessage, setGameMessage]=props.gameMessage;

    setTimeout(()=>{
        document.getElementsByClassName("for-information")[0].style.zIndex=1;
    }, 350);
    

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
        for(let i=0;i<dictionary.length;i++){
            if(currWord===dictionary[i]) return true;
        }
        return false;
    }
    
    
    
    
    function handleInput(letter){
        if(nextIndex===6) return;
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
                    let winningIndex=nextIndex;
                    let timeForWinAnimation=150;
                    setNextIndex(6);
                    setTimeout(()=>{
                        setTimeout(()=>{
                            document.getElementById(winningIndex*5).classList.add("up");
                            setTimeout(()=>{
                                document.getElementById(winningIndex*5).classList.remove("up");
                                document.getElementById(winningIndex*5).classList.add("down");
                                document.getElementById(winningIndex*5+1).classList.add("up");
                                setTimeout(()=>{
                                    document.getElementById(winningIndex*5+1).classList.remove("up");
                                    document.getElementById(winningIndex*5+1).classList.add("down");
                                    document.getElementById(winningIndex*5).classList.remove("down");
                                    document.getElementById(winningIndex*5+2).classList.add("up");
                                    setTimeout(()=>{
                                        document.getElementById(winningIndex*5+2).classList.remove("up");
                                        document.getElementById(winningIndex*5+2).classList.add("down");
                                        document.getElementById(winningIndex*5+1).classList.remove("down");
                                        document.getElementById(winningIndex*5+3).classList.add("up");
                                        setTimeout(()=>{
                                            document.getElementById(winningIndex*5+3).classList.remove("up");
                                            document.getElementById(winningIndex*5+3).classList.add("down");
                                            document.getElementById(winningIndex*5+2).classList.remove("down");
                                            document.getElementById(winningIndex*5+4).classList.add("up");
                                            setTimeout(()=>{
                                                document.getElementById(winningIndex*5+4).classList.remove("up");
                                                document.getElementById(winningIndex*5+4).classList.add("down");
                                                document.getElementById(winningIndex*5+3).classList.remove("down");
                                                setTimeout(()=>{
                                                    document.getElementById(winningIndex*5+4).classList.remove("down");
                                                }, timeForWinAnimation);
                                            }, timeForWinAnimation);
                                        }, timeForWinAnimation);
                                    }, timeForWinAnimation);
                                }, timeForWinAnimation);
                            }, timeForWinAnimation);
                        }, timeForWinAnimation);
                    }, 1600);
                    
                    setTimeout(()=>{
                        if(winningIndex===0) setGameMessage("I bet that will never happen again.");
                        else if(winningIndex===1) setGameMessage("Pro in the house.");
                        else if(winningIndex===2) setGameMessage("Looks like half the grid is all you need.");
                        else if(winningIndex===3) setGameMessage("I guess its too easy for you.");
                        else if(winningIndex===4) setGameMessage("And that's how it gets done.");
                        else setGameMessage("Phew, barely made it.");
                        
                        setIsGameMessageVisible(true);
                    }, 2900);
                    
                } 
                else{
                    if(nextIndex===5){
                        setTimeout(()=>{
                            setGameMessage('Nice try, the answer was "' + answer.toUpperCase() + '"');
                            setIsGameMessageVisible(true);
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
                let timeForShake=50;
                document.getElementById("mainInput").type="hidden";
                setTimeout(()=>{
                    document.getElementById("mainInput").type="text";
                    document.getElementById("mainInput").focus();
                }, 11*timeForShake);


                setIsInvalidMessageVisible(true);
                setTimeout(()=>{
                    setIsInvalidMessageVisible(false);
                }, 20*timeForShake);


                for(let i=0;i<5;i++){
                    document.getElementById(nextIndex*5 + i).classList.add("left-1");
                }
                setTimeout(()=>{
                    for(let i=0;i<5;i++){
                        document.getElementById(nextIndex*5 + i).classList.remove("left-1");
                        document.getElementById(nextIndex*5 + i).classList.add("right-1");
                    }
                    setTimeout(()=>{
                        for(let i=0;i<5;i++){
                            document.getElementById(nextIndex*5 + i).classList.remove("right-1");
                            document.getElementById(nextIndex*5 + i).classList.add("left-3");
                        }
                        setTimeout(()=>{
                            for(let i=0;i<5;i++){
                                document.getElementById(nextIndex*5 + i).classList.remove("left-3");
                                document.getElementById(nextIndex*5 + i).classList.add("right-3");
                            }
                            setTimeout(()=>{
                                for(let i=0;i<5;i++){
                                    document.getElementById(nextIndex*5 + i).classList.remove("right-3");
                                    document.getElementById(nextIndex*5 + i).classList.add("left-5");
                                }
                                setTimeout(()=>{
                                    for(let i=0;i<5;i++){
                                        document.getElementById(nextIndex*5 + i).classList.remove("left-5");
                                        document.getElementById(nextIndex*5 + i).classList.add("right-5");
                                    }
                                    setTimeout(()=>{
                                        for(let i=0;i<5;i++){
                                            document.getElementById(nextIndex*5 + i).classList.remove("right-5");
                                            document.getElementById(nextIndex*5 + i).classList.add("left-3");
                                        }
                                        setTimeout(()=>{
                                            for(let i=0;i<5;i++){
                                                document.getElementById(nextIndex*5 + i).classList.remove("left-3");
                                                document.getElementById(nextIndex*5 + i).classList.add("right-3");
                                            }
                                            setTimeout(()=>{
                                                for(let i=0;i<5;i++){
                                                    document.getElementById(nextIndex*5 + i).classList.remove("right-3");
                                                    document.getElementById(nextIndex*5 + i).classList.add("left-1");
                                                }
                                                setTimeout(()=>{
                                                    for(let i=0;i<5;i++){
                                                        document.getElementById(nextIndex*5 + i).classList.remove("left-1");
                                                        document.getElementById(nextIndex*5 + i).classList.add("right-1");
                                                    }
                                                    setTimeout(()=>{
                                                        for(let i=0;i<5;i++){
                                                            document.getElementById(nextIndex*5 + i).classList.remove("right-1");
                                                        }
                                                    }, timeForShake);
                                                }, timeForShake);
                                            }, timeForShake);
                                        }, timeForShake);
                                    }, timeForShake);
                                }, timeForShake);
                            }, timeForShake);
                        }, timeForShake);
                    }, timeForShake);
                }, timeForShake);
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
            <InvalidWord className={isInvalidMessageVisible ? "visible" : "invisible"} />
            <div className="playing-board-container">
                {[...numArray, 5].map(firstIndex=>
                    [...numArray].map(secondIndex=>
                        <LetterTile currAction={lastAction} workingIndex={nextIndex*5 + letterIndex}id={(firstIndex*5) + secondIndex} content={letters[firstIndex][secondIndex]} colour={colours[firstIndex][secondIndex]} informationState={props.informationState} />))} 

            </div>

            <div className="keyboard-container">
                <div className="keyboard-row-1">
                    {keyboardLayout[0].map(letter=>
                        <KeyboardTile colours={keyboardColours} content={letter} gameMessageState={isGameMessageVisible} onClick={()=>{handleInput(letter)}} currAction={lastAction}/>)}
                </div>


                <div className="keyboard-row-2">
                    {keyboardLayout[1].map(letter=>
                        <KeyboardTile colours={keyboardColours} content={letter} gameMessageState={isGameMessageVisible} onClick={()=>{handleInput(letter)}} currAction={lastAction}/>)}
                </div>
                

                <div className="keyboard-row-3">
                    <KeyboardTileBig content="ENTER" gameMessageState={isGameMessageVisible} onClick={()=>{handleInput("ENTER")}}/>

                    {keyboardLayout[2].map(letter=>
                        <KeyboardTile colours={keyboardColours} content={letter} gameMessageState={isGameMessageVisible} onClick={()=>{handleInput(letter)}} currAction={lastAction}/>)}
                    
                    <KeyboardTileBig content={<FontAwesomeIcon icon={faDeleteLeft} size="xl" />} gameMessageState={isGameMessageVisible} onClick={()=>{handleInput("BACK")}}/>
                </div>
            </div>
            {props.informationState[0]===false ? (
                <div>
                    <div className="for-information invisible"></div>
                    <input  unselectable="on"
                        onMouseDown={()=>{return false}}
                        role="presentation" autoComplete="off" id="mainInput" type="text" autoFocus onBlur={({target})=>{target.focus()}} onKeyDown={(e)=>{
                        handleInput(e.key.toUpperCase());
                        }} />
                </div>
            ) : <div className="for-information visible"></div>}
        </div>    
    );
}


export default PlayingBoard;