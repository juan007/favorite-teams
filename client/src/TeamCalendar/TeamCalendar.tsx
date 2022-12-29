import React from 'react';
import { useParams,Link,useNavigate } from "react-router-dom";
import {ComponentProps,Team,MyTeam,Game } from "../Tools/data.model";
import '../../node_modules/@fortawesome/fontawesome-free/css/all.css';

import GameDetail from "../GameDetail/GameDetail";

const TeamCalendar = ({ myTeams, teams }:ComponentProps) => {
    
    let { code } = useParams<{code:string}>();
    let myTeam:(MyTeam | undefined) = myTeams.find(item=>item.code===code);
    let myTeamImage:(string | undefined) = teams.find(item=>item.code===code)?.image;
    // ---------------------------------- render to the DOM
    return(
        (myTeam!==undefined)?
        <div className="flex flex-wrap grid place-items-center">
            <div className="flex flex-col flex-nowrap pr-5">
                <div className='text-blue-600 font-bold text-center text-xl pt-7 font-serif'>{myTeam.name}</div>
                <div className='pb-4 text-center'>Played and Upcomming Matches </div>
                <Link to={`/newGame/`+myTeam.code} className='text-blue-600 font-bold'>NEW GAME <Link to={`/newGame/`+myTeam.code} className="text-blue-600 fab fa-plus fa-1x"></Link></Link>
                {
                //before mapping we sort the array by date
                myTeam.games.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0)).map((data:Game, n:number)=>
                    <div key={n} className="py-3">
                        <div className="text-accent font-sans">
                            <GameDetail myTeamName={myTeam!.name} myTeamImage={myTeamImage!} rivalName={teams.find(item=>item.code===data.rivalCode)!.name} rivalImage={teams.find(item=>item.code===data.rivalCode)!.image} gameData={data} />
                        </div>
                    </div>
                )
                }
                <Link to={`/newGame/`+myTeam.code} className='text-blue-600 font-bold'>NEW GAME <Link to={`/newGame/`+myTeam.code} className="text-blue-600 fab fa-plus fa-1x"></Link></Link>
            </div>
        </div>
        :
        <div className="pt-2">
                <div className="font-bold"><i className="fas fa-arrow-left content__button pr-2 text-xl 
                hover:text-accent"></i>Error</div>
                <div className="max-w-3xl pb-4">Team does not exist in database</div>
        </div>
    );
}

export default TeamCalendar;