import React from "react";
import './App.css';
import PlayingBoard from "./Components/PlayingBoard/PlayingBoard.js";
import Header from "./Components/Header/Header.js";
import Information from "./Components/Information/Information.js";
import GameOver from "./Components/GameOver/GameOver.js";


// if(localStorage.getItem("darkMode")===null){
//   localStorage.setItem("darkMode", false);                 FOR FUTURE DARK MODE COMPATIBILITY
// }

function App() {
  const [isInformationVisible, setIsInformationVisible] = React.useState(false);
  const [lastAction, setLastAction] = React.useState("");
  const [isGameMessageVisible, setIsGameMessageVisible] = React.useState(false);
  const [gameMessage, setGameMessage] = React.useState('Nice Try, The Answer was "APPLE"');
  //const [isDarkMode, setIsDarkMode] = React.useState(localStorage.getItem("darkMode"));    FOR FUTURE DARK MODE COMPATIBILITY
  return (
    <div className={"App" + (isInformationVisible ? "" : " overflow-hidden")}>
      <Header gameMessageState={isGameMessageVisible} informationState={[isInformationVisible, setIsInformationVisible]}/>
      <Information informationState={[isInformationVisible, setIsInformationVisible]} lastAction={[lastAction, setLastAction]}/>
      <PlayingBoard gameMessage={[gameMessage, setGameMessage]} gameMessageState={[isGameMessageVisible, setIsGameMessageVisible]} informationState={[isInformationVisible, setIsInformationVisible]} lastAction={[lastAction, setLastAction]} />
      <GameOver gameMessage={[gameMessage, setGameMessage]} gameMessageState={[isGameMessageVisible, setIsGameMessageVisible]} lastAction={[lastAction, setLastAction]} />
    </div>
  );
}

export default App;
