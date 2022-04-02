import React from "react";
import './App.css';
import PlayingBoard from "./Components/PlayingBoard/PlayingBoard.js";
import Header from "./Components/Header/Header.js";
import Information from "./Components/Information/Information.js";
// if(localStorage.getItem("darkMode")===null){
//   localStorage.setItem("darkMode", false);
// }

function App() {
  const [isInformationVisible, setIsInformationVisible] = React.useState(false);
  const [lastAction, setLastAction] = React.useState("");
  //const [isDarkMode, setIsDarkMode] = React.useState(localStorage.getItem("darkMode"));
  return (
    <div className="App">
      <Header informationState={[isInformationVisible, setIsInformationVisible]}/>
      {isInformationVisible ? <Information informationState={[isInformationVisible, setIsInformationVisible]} lastAction={[lastAction, setLastAction]}/> : <div></div>}
      <PlayingBoard informationState={[isInformationVisible, setIsInformationVisible]} lastAction={[lastAction, setLastAction]} />
    </div>
  );
}

export default App;
