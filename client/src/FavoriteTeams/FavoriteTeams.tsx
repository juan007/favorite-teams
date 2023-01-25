import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import {ComponentPropsFavoriteTeams,MyTeam } from "../Tools/data.model";
import '../../node_modules/@fortawesome/fontawesome-free/css/all.css';

const FavoriteTeams = ({ myTeams, teams, getData }:ComponentPropsFavoriteTeams) => {
    
    /**
     * When a team is selected on the dropdown
     * @param e 
     */
    const onMyTeamChange = (e:any)=> {
        getData();
        setShowMessage(false);
        navigate('/TeamCalendar/' + e.target.value);
    }
    
    const navigate = useNavigate();
    
    //state variables
    const[show,setShowMessage] = React.useState<boolean>(true);
    
    // ---------------------------------- render to the DOM
    return(
        (myTeams!==undefined && teams!==undefined )?
        <div className="flex flex-wrap grid place-items-center ">
            <div className="flex flex-row flex-nowrap pr-1">
                
                <select id="lstSamples" title="SELECT ONE OF YOUR FAVORITE TEAMS TO SEE THE CALENDAR"
                    className="bg-gray-200 hover:bg-opacity-90 text-[#035074] py-2 px-3 rounded mb-3"
                    onChange={onMyTeamChange}>
                    <option value={0}>Select team ...</option>
                    {myTeams!.map((data:MyTeam,n:number) => {
                            return <option key={n} value={data.code}>{data.name}</option>
                    })}
                </select>
                
            </div>
            <Link title="CLICK TO REGISTER A NEW FOLLOWED TEAM.  COMING SOON..."  className='text-blue-600  text-center text-xs' to="">NEW TEAM <i className="fa-solid fa-plus"></i></Link>
            <div style={{ display:(show ? "flex":"none") }} className="text-blue-600 pt-4">
                <p>Welcome to the Followed Teams App.<br/>
                Where you can save the upcoming <br/>
                games of your favorite teams and<br/>
                save the score when the game has<br/>
                taken place.</p>
            </div>
            
        </div>
        :
        <div className="pt-2">
                <div className="font-bold"><i className="fas fa-arrow-left content__button pr-2 text-xl 
                hover:text-accent"></i>Error</div>
                <div className="max-w-3xl pb-4">No teams exist in database</div>
        </div>
    );
}

export default FavoriteTeams;