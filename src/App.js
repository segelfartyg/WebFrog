import logo from "./logo.svg";
import "./App.css";
import froggle from "./froggle.svg";
import React, { useRef, useEffect, useState } from "react";

function App() {
  const searchBarValue = useRef();
  const [frogTime, setFrogtime] = useState("00:00")
  const [frogstyle, setFrogStyle] = useState({animation: "none 1s forwards",
  });
  useEffect(() => {
    searchBarValue.current.focus();

    window.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        onSearchClickHandler();
      }
    });
  }, []);

  function onSearchClickHandler(event) {
    let query = "";

    if (searchBarValue.current.value[0] === "/") {
      let command = "";
      let letter = "";
      let queryPosition = 0;
      let commandDone = false;
      let firstwordDone = false;
      let firstword = "";

      for (let i = 0; i < searchBarValue.current.value.length; i++) {
        if (searchBarValue.current.value[i] === " " && commandDone === false) {
          commandDone = true;
        } else {
          if (!commandDone) {
            command += searchBarValue.current.value[i];
          }
          if (!firstwordDone && commandDone) {
            firstword += searchBarValue.current.value[i];
          }
        }
      }

      
      switch (command) {
        case "/wiki":
          console.log("WIKI: " + firstword);
          query = "https://sv.wikipedia.org/wiki/" + firstword;
          break;

        case "/so":
          console.log("SITE: " + firstword);
          query =
            "https://www.google.com/search?q=" +
            firstword +
            " site%3Astackoverflow.com&oq=css+site%3Astackoverflow.com&aqs=chrome..69i57.7308j0j4&sourceid=chrome&ie=UTF-8";
          break;


          case "/fb":
            console.log("SITE: " + firstword);
            query =
              "https://www.google.com/search?q=" +
              firstword +
              " site%3Aflashback.org&oq=css+site%3Astackoverflow.com&aqs=chrome..69i57.7308j0j4&sourceid=chrome&ie=UTF-8";
            break;

        case "/weather":
          console.log("WEATHER " + firstword);
          query = "https://xn--vder24-bua.se/" + firstword;
          break;

        case "/calc":
          console.log("calc " + firstword);
          query = "https://www.desmos.com/scientific?lang=sv-SE";
          break;

        case "/tv":
          console.log("tv " + firstword);
          query = "https://kolla.tv/";
          break;

        case "/watch":
          console.log("watch " + firstword);

          if(firstword.length < 1){
            query = "https://www.youtube.com/"
          }
          else{
            query = "https://www.youtube.com/results?search_query=" + firstword;
          }
          break;

        default:
          break;
      }

      console.log(command);
      window.location.href = query;
     
      setFrogStyle({animation: "jump 0.1s forwards"})
      console.log(frogstyle)
      
    } else {
      console.log(searchBarValue.current.value);
      query = "https://www.google.com/search?q=" + searchBarValue.current.value;
      
     window.location.href = query;
      setFrogStyle({animation: "jump 0.1s forwards"})
      console.log(frogstyle)
    }


  }


  setInterval(() => {
    // axios.get('http://localhost:3000/time').then(resp => {

    // console.log(clock)
    //    clock.innerHTML = resp.data;
    // });
    

    let date = new Date();

    let hour = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
  
    if(minutes.toString().length < 2){
      minutes = "0" + minutes
    }
    if(seconds.toString().length < 2){
      seconds = "0" + seconds
    }

    setFrogtime(hour.toString() + " : " + minutes.toString());

}, 1000);

  return (
    <div className="App">
      <header className="App-header">
        

        <div className="navBar">
        <div className="navItem">Frogger</div>
        <div className="navItem last">docs</div>
        </div>
        
    
        <div className="menuLine"></div>
      </header>

      
      <div className="mainDiv">
        <p className="frogTimeStyle">{frogTime}</p>
        <img style={frogstyle}className="frogglemain" alt="froggle" src={froggle} />
        <input
          className="input search"
          ref={searchBarValue}
          type="text"
        ></input>
        <button onClick={onSearchClickHandler} className="button">
          JUMP!
        </button>
      </div>


      {/* <footer className="App-footer">

      <div className="menuLine"></div>
      <div className="footBar">
        <div className="navItem">segel</div>
       
        </div>
        
    
      </footer> */}
    </div>
  );
}

export default App;
