//Component that renders a team image and name
import React from 'react';

import Moment from 'moment';

import {Game as Game} from "../Tools/data.model";
import Team from "../Team/Team";

const GameDetail = ({myTeamName,myTeamImage,rivalName,rivalImage,gameData}:{myTeamName:string,myTeamImage:string,rivalName:string,rivalImage:string,gameData:Game}) =>{

    Moment.locale('en');
    return(
        (gameData.local===true)?
        <>
            <div  className = "bg-white shadow-md shadow-slate-400 rounded-lg py-2 pl-5 pr-4">
                <table>
                    <tr>
                        <td className='font-semibold'><Team name={myTeamName} image={myTeamImage}/></td>
                        <td className='pl-3 font-semibold'>{gameData.goalsFavor}</td>
                    </tr>
                   
                    <tr>
                        <td className='py-3 text-center' colSpan={2}>{Moment(gameData.date.toString()).format('ddd MMM Do, YYYY hh:mm')}</td>
                    </tr>
                    <tr>
                        <td><Team name={rivalName} image={rivalImage}/></td>
                        <td className='pl-3'>{gameData.goalsAgainst}</td>
                    </tr>
                </table>
            </div>
        </>
        :
        <>
            <div  className = "bg-white shadow-md shadow-slate-400 rounded-lg py-2 pl-5 pr-4">
                <table>
                    <tr>
                        <td><Team name={rivalName} image={rivalImage}/></td>
                        <td className='pl-3'>{gameData.goalsAgainst}</td>
                    </tr>
                <tr><td className='py-3' colSpan={2}>{Moment(gameData.date.toString()).format('ddd MMM Do, YYYY hh:mm')}</td></tr>
                    <tr>
                        <td className='font-semibold'><Team name={myTeamName} image={myTeamImage}/></td>
                        <td className='pl-3 font-semibold'>{gameData.goalsFavor}</td>
                    </tr>
                </table>
            </div>
        </>
    );
}

export default GameDetail;