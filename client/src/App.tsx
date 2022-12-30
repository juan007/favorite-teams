//TODO:Captcha
//TODO:Style site
//TODO:Check responsiveness
//TODO:Change goals in favor to points in favor
//TODO:Edit Game
//TODO:Delete Game
//TODO:Create Team
//TODO:Time on games on calendar show pm/am


import React from 'react';
import { getJSONData } from "./Tools/Toolkit";
import { JSONData, MyTeam, Team } from "./Tools/data.model";
import { useParams,Link,useNavigate } from "react-router-dom";
import "./../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css"; 
import "./../node_modules/@fortawesome/fontawesome-free/css/solid.css";

import LoadingOverlay from "./LoadingOverlay/LoadingOverlay";

//For routing
import {Route, Routes} from "react-router-dom";

import TeamComponent from "./Team/Team";
import TeamCalendar from "./TeamCalendar/TeamCalendar";
import FavoriteTeams from "./FavoriteTeams/FavoriteTeams";
import NewGame from "./NewGame/NewGame";
import Error from "./Error/Error";


const RETRIEVE_SCRIPT:string = "http:///localhost/get";
//const RETRIEVE_SCRIPT:string = "/get";



function App() {

  // ---------------------------------------------- event handlers
  const onResponse = (result:JSONData) => {
    setMyTeams(result.myteams);
    setTeams(result.teams);
    setLoading(false);
  };

  const onError = () => console.log("*** Error has occured during AJAX data transmission");

  // ---------------------------------------------- lifecycle hooks
  React.useEffect(() => {
    getJSONData(RETRIEVE_SCRIPT, onResponse, onError);
  }, []);

  //state variables
  const [myTeams, setMyTeams] = React.useState<MyTeam[]>([]);
  const [teams, setTeams] = React.useState<Team[]>([]);
  
  // other methods
  const getData = () => {
    getJSONData(RETRIEVE_SCRIPT, onResponse, onError);
  }

  // --------------------------------------------- state setup
  const [loading, setLoading] = React.useState<boolean>(true); 

  return (
    <div className="bg-slate-100 min-h-screen">
      <LoadingOverlay bgColor="#a72f57" spinnerColor="#FFFFFF" enabled={loading} />
      <div className="grid place-items-center text-blue-600 font-serif font-bold text-xl py-2.5">FOLLOWED TEAMS</div>
      {(teams.length>0)? 
        <>
        <FavoriteTeams myTeams={myTeams} teams={teams}/>
        <Routes>
          <Route
            path="/"
            
          />
          <Route
            path="/TeamCalendar/:code"
            element = {<TeamCalendar teams={teams} myTeams={myTeams}/>}
          />
          <Route
            path="/NewGame/:teamCode"
            element = {<NewGame setLoEnabled={setLoading} getData={getData} teams={teams}/>}
          />
          <Route
            path="/deleteGame/:teamCode/:gameCode"
            element = {<NewGame setLoEnabled={setLoading} getData={getData} teams={teams}/>}
          />
          <Route
            path="/*"
            element = {<Error/>}
          />
        </Routes>
        </>
        
        :<div>No teams</div>
        } 
    </div>
  );
}

export default App;