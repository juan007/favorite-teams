import React from 'react';
import { getJSONData } from "./Tools/Toolkit";
import { JSONData, MyTeam, Team } from "./Tools/data.model";
import "./../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css"; 
import "./../node_modules/@fortawesome/fontawesome-free/css/solid.css";

import LoadingOverlay from "./LoadingOverlay/LoadingOverlay";

//For routing
import {Route, Routes} from "react-router-dom";

import TeamCalendar from "./TeamCalendar/TeamCalendar";
import FavoriteTeams from "./FavoriteTeams/FavoriteTeams";
import NewGame from "./NewGame/NewGame";
import Error from "./Error/Error";


const RETRIEVE_SCRIPT:string = "http://localhost/get";
//const RETRIEVE_SCRIPT:string = "/get";

function App() {

  // ---------------------------------------------- event handlers

  /**
   * Triggered if the API respondend with a result
   * @param result - is the result fetched by the API
   */
  const onResponse = (result:JSONData) => {
    setMyTeams(result.myteams);
    setTeams(result.teams);
    setLoading(false);
  };

  const onError = () => console.log("*** Error has occured during AJAX data transmission");

  // ---------------------------------------------- lifecycle hooks
  React.useEffect(() => {
    //bring the data
    getJSONData(RETRIEVE_SCRIPT, onResponse, onError);
  }, []);

  //state variables
  const [myTeams, setMyTeams] = React.useState<MyTeam[]>([]);
  const [teams, setTeams] = React.useState<Team[]>([]);
  
  // other methods
  /**
   * get all team games, needed on demand from other components
   */
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
        {/* Fist component showing the dropdown to pick a favorite team */}
        <FavoriteTeams myTeams={myTeams} teams={teams} getData={getData}/>
        
        <Routes>
          <Route
            path="/"
            
          />
          <Route
            path="/TeamCalendar/:code"
            element = {<TeamCalendar teams={teams} myTeams={myTeams} setLoEnabled={setLoading} getData={getData}/>}
          />
          <Route
            path="/NewGame/:teamCode"
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