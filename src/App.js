import logo from "./logo.svg";
import "./App.css";
import froggle from "./froggle.svg";
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";



function App() {
  const searchBarValue = useRef();
  const [frogTime, setFrogtime] = useState("00:00")
  const [frogstyle, setFrogStyle] = useState({animation: "none 1s forwards",
  });
  const [frogTempNow, setfrogTempNow] = useState("20");
  const [frogTemp5, setfrogTemp5] = useState("21");

  const [news, setNews] = useState([{}])
  const  [dayData, setDayData] = useState(["1", "1", "2000"])

useEffect(() => {
  
setInterval(() => {
  
  axios.get('https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/17.630716/lat/59.832919/data.json')
  .then(function (response) {
    // handle success
    // console.log(response.data.timeSeries[0]);
    

    var date = new Date();
 

for(let i = 0; i < response.data.timeSeries.length; i++){

  var forecastDate = new Date(response.data.timeSeries[i].validTime);

  if(date.getHours() + 5 == forecastDate.getHours()){

    console.log("TEMP OM FEM TIMMAR: " + response.data.timeSeries[i].parameters[0].values)
    setfrogTemp5(response.data.timeSeries[i].parameters[0].values)
    break;
  }
}

  })

  axios.get('https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/97510/period/latest-hour/data.json')
  .then(function (response) {
    // handle success

    console.log("VÄDER NU: " + response.data.value[0].value);
    setfrogTempNow(response.data.value[0].value);
  })




  axios.get('https://rss.aftonbladet.se/rss2/small/pages/sections/senastenytt/')
  .then(function (response) {
    // handle success

    var parser = new DOMParser();
    var text = response.data;
    var xmlDoc = parser.parseFromString(text, "text/xml")

    console.log(xmlDoc)

    var txt = "";
    var x = xmlDoc.getElementsByTagName("item");
    console.log(x)

    var newsItems = []
  
for (let i = 0; i < x.length; i++) {


   
  
  var title = ""
  var desc = ""

  try{
  txt += x[i].childNodes[1].textContent + "<br>";
      title = x[i].childNodes[1].textContent
      desc = x[i].childNodes[9].textContent
      console.log(x[i].childNodes[9].textContent)

  }
  catch{


  }

  newsItems.push({"title": title, "desc": desc})

}

setNews(newsItems)
  console.log(txt)


    console.log(response.data);
  })



var dayData = new Date()

var day = dayData.getDate()
var month = dayData.getMonth()
var year = dayData.getFullYear()

setDayData([day, month, year])




}, 5000);


}, [])


  

// useEffect(() => {
//   // UPPSALA WEATHER
//   axios.get('https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/17.630716/lat/59.832919/data.json')
//   .then(function (response) {
//     // handle success
//     // console.log(response.data.timeSeries[0]);
    

//     var date = new Date();
 

// for(let i = 0; i < response.data.timeSeries.length; i++){

//   var forecastDate = new Date(response.data.timeSeries[i].validTime);

//   if(date.getHours() + 5 == forecastDate.getHours()){

//     console.log("TEMP OM FEM TIMMAR: " + response.data.timeSeries[i].parameters[0].values)
//     break;
//   }
// }

//   })

//   axios.get('https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/97510/period/latest-hour/data.json')
//   .then(function (response) {
//     // handle success

//     console.log("VÄDER NU: " + response.data.value[0].value);
//   })

//   //
// }, [])

  // (async () => {
  //   const browser = await puppeteer.launch();
  //   const page = await browser.newPage();
  //   await page.goto('https://xn--vder24-bua.se/uppsala/');
  //   await page.screenshot({path: 'example.png'});
  
  //   await browser.close();
  // })();


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
      
      
    <div className="mainDiv">

    <div className="box">
    
    <h1 className="frogTimeStyle">{frogTime}</h1> 
    
    </div>

   <div className="box temp">
    <h1 className="frogTimeStyle">NU: {frogTempNow}°</h1>
   
   </div>
 

   <div className="box temp">
   <h1 className="frogTimeStyle">5H: {frogTemp5}°</h1>
   </div>
   
  </div>


  <div className="middleColumn">
 
  <div className="middleBox date">

  <div className="dateDiv">
  <p>{dayData[0] + "/" + dayData[1] + " - " + dayData[2]}</p>

  </div>
 

  </div>


  
  
  
 <div className="middleBox">

<div className="newsArea">





{news.map((item) => {

  return (<div className="newsItem">
<h4>{item.title}</h4>
<p className="ingress">{item.desc}</p>
</div>)


  console.log(item)
})}


</div>



 </div>

  </div>


 

    
   

    

      {/* <footer className="App-footer">

      <div className="menuLine"></div>
      <div className="footBar">
        <div className="navItem">segel</div>
       
        </div>
        
    
      </footer> */}

      <div className="footerBox">


      
      
   
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


    </div>
  );
}

export default App;
