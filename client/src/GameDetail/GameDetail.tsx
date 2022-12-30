//Component that renders a team image and name
import React from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

import Moment from 'moment';

import { ComponentPropsGameDetail } from "../Tools/data.model";
import Team from "../Team/Team";

import '../../node_modules/@fortawesome/fontawesome-free/css/all.css';

import {sendJSONData} from "../Tools/Toolkit";

const SUBMIT_SCRIPT:string = "http://localhost/deleteGame";

const GameDetail = ({myTeamName,myTeamImage,rivalName,rivalImage,gameData,myTeamCode,setLoEnabled, getData}:ComponentPropsGameDetail) =>{

    //to handle dates
    Moment.locale('en');
    
    //When the delete button is pressed
    const onDelete = (e:any) => {
        
            setLoEnabled(true);
            let sendJSON = 
            {
                "teamCode":myTeamCode,
                "gameCode": gameData.gameCode
            };

        //serelization.-convert the JSON object to a string 
        let sendString:string = JSON.stringify(sendJSON);
        //send the JSON data to the WEb API
        sendJSONData(SUBMIT_SCRIPT,sendString, onSubmitResponse, onSubmitError,'DELETE');

        setShow(false);
        
    }

    const navigate = useNavigate();
    //When the game was successfully registered
    const onSubmitResponse = ()=> {
        //retreive updated data
        getData();
        setLoEnabled(false);
        navigate('/TeamCalendar/'+myTeamCode);
    }

    //If there is an error after sending the data to the server
    const onSubmitError = (error:any)=> {
        console.log('Error occured with data submit');
    }

    //Function to show/hide delete confirmation options
    const confirmationToggle = (e:any) => {
        show?setShow(false):setShow(true);
    }

    //state variables

    //variable that handles the visibility of ok and cancel confirmation buttons to delete game
    const[show,setShow] = React.useState<boolean>(false);


    return(
        // If team is playing local show team on top, otherwise show on bottom
        (gameData.local===true)?
        <>
            <div  className = "bg-white shadow-md shadow-slate-400 rounded-lg py-2 pl-5 pr-4">
                <table>
                    <tr>
                        <td className='font-semibold'><Team name={myTeamName} image={myTeamImage}/></td>
                        <td className='pl-3 font-semibold'>{gameData.goalsFavor}</td>
                    </tr>
                   
                    <tr>
                        <td className='py-3 text-center' colSpan={2}>
                            {Moment(gameData.date.toString()).format('ddd MMM Do, YYYY hh:mm a')}
                        </td>
                    </tr>
                    <tr>
                        <td><Team name={rivalName} image={rivalImage}/></td>
                        <td className='pl-3'>{gameData.goalsAgainst}</td>
                    </tr>
                    <tr>
                        <td className='text-center' colSpan={2}>
                        <button id="btnSubmit" className="text-blue-600 pl-1 pr-1" onClick={confirmationToggle}><i className="fa-solid fa-trash-can"></i></button>
                            <Link to={`/editGame/`} className="text-blue-600 pl-1"><i className="fa-sharp fa-solid fa-pen-to-square"></i></Link>
                        </td>
                    </tr>
                    <tr>
                        <td className='text-center' colSpan={2} style={{ display:(show ? "flex":"none") }}>
                            <div>Are you sure? </div>
                            <button id="btnSubmit" className="bg-red-700 text-[#FFF] ml-1 pl-1 pr-1 " onClick={onDelete}>Delete</button>
                            <button id="btnSubmit" className="bg-green-500 text-[#000] ml-1 pl-1 pr-1 " onClick={confirmationToggle}>Cancel</button>
                        </td>
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
                    <tr>
                        <td className='py-3' colSpan={2}>
                            {Moment(gameData.date.toString()).format('ddd MMM Do, YYYY hh:mm a')}
                        </td>
                    </tr>
                    <tr>
                        <td className='font-semibold'><Team name={myTeamName} image={myTeamImage}/></td>
                        <td className='pl-3 font-semibold'>{gameData.goalsFavor}</td>
                    </tr>
                    <tr>
                        <td className='text-center' colSpan={2}>
                        <button id="btnSubmit" className="text-blue-600 pl-1 pr-1" onClick={confirmationToggle}><i className="fa-solid fa-trash-can"></i></button>
                            <Link to={`/editGame/`} className="text-blue-600 pl-1"><i className="fa-sharp fa-solid fa-pen-to-square"></i></Link>
                        </td>
                    </tr>
                    <tr>
                        <td className='text-center' colSpan={2} style={{ display:(show ? "flex":"none") }}>
                            <div>Are you sure? </div>
                            <button id="btnSubmit" className="bg-red-700 text-[#FFF] ml-1 pl-1 pr-1 " onClick={onDelete}>Delete</button>
                            <button id="btnSubmit" className="bg-green-500 text-[#000] ml-1 pl-1 pr-1 " onClick={confirmationToggle}>Cancel</button>
                        </td>
                    </tr>
                </table>
            </div>
        </>
    );
}

export default GameDetail;