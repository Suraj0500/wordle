import React from "react";
import './App.css';
import PlayingBoard from "./Components/PlayingBoard/PlayingBoard.js";
import Header from "./Components/Header/Header.js";
import Information from "./Components/Information/Information.js";
import GameOver from "./Components/GameOver/GameOver.js";


let storedInformationMode=localStorage.getItem("firstVisit");

function App() {
  let storedDarkMode=localStorage.getItem("darkMode");
  const [isDarkMode, setIsDarkMode] = React.useState(storedDarkMode==="true" ? true : false);
  React.useEffect(()=>{
      localStorage.setItem("darkMode", isDarkMode);
  });
  const [isInformationVisible, setIsInformationVisible] = React.useState(storedInformationMode===null ? true : false);
  const [lastAction, setLastAction] = React.useState("");
  const [isGameMessageVisible, setIsGameMessageVisible] = React.useState(false);
  const [gameMessage, setGameMessage] = React.useState("");
  const [buttonActive, setButtonActive] = React.useState(true);
  return (
    <div className={"App" + (isInformationVisible ? "" : " overflow-hidden") + (isDarkMode ? " dark" : " light")}>
      <Header buttonState={buttonActive} darkModeState={[isDarkMode, setIsDarkMode]} gameMessageState={isGameMessageVisible} informationState={[isInformationVisible, setIsInformationVisible]} lastAction={[lastAction, setLastAction]}/>
      <Information darkModeState={isDarkMode} informationState={[isInformationVisible, setIsInformationVisible]} lastAction={[lastAction, setLastAction]}/>
      <PlayingBoard buttonState={[buttonActive, setButtonActive]} darkModeState={isDarkMode} gameMessage={[gameMessage, setGameMessage]} gameMessageState={[isGameMessageVisible, setIsGameMessageVisible]} informationState={[isInformationVisible, setIsInformationVisible]} lastAction={[lastAction, setLastAction]} />
      <GameOver darkModeState={isDarkMode} gameMessage={[gameMessage, setGameMessage]} gameMessageState={[isGameMessageVisible, setIsGameMessageVisible]} lastAction={[lastAction, setLastAction]} />
    </div>
  );
}

export default App;
