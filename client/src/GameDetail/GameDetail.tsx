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
    
    /** 
     * When the delete button is pressed
    */
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

        setShowDelete(false);
        
    }

    const navigate = useNavigate();

    /**
     * When the game was successfully registered 
     */
    
    const onSubmitResponse = ()=> {
        //retreive updated data
        getData();
        setLoEnabled(false);
        navigate('/TeamCalendar/'+myTeamCode);
    }

    /**
     * If there is an error after sending the data to the server
     * @param error 
     */
    
    const onSubmitError = (error:any)=> {
        console.log('Error occured with data submit');
    }

    //Function to show/hide delete confirmation options

    /**
     * To show or hide the delete confirmation
     * @param e 
     */
    const confirmationToggle = (e:any) => {
        show?setShowDelete(false):setShowDelete(true);
    }

    

    /**
     * Function to show/hide edit points inputs 
     * @param e 
     */
    const editToggle = (e:any) => {
        if(showEdit){
            setShowEdit(false)
        }
        else{
            setPointsFavor((gameData.goalsFavor!=null)?gameData.goalsFavor.toString():"");
            setPointsAgainst((gameData.goalsAgainst!=null)?gameData.goalsAgainst.toString():"");
            setShowEdit(true);
        }
    }

    /**
     * When the Points in Favor input changes
     * @param e 
     */
    const onPointsFavorChange = (e:any) => {
        //set points in favor variable
        setPointsFavor(e.target.value);
    }

    /**
     * When the Points against input changes
     * @param e 
     */
    const onPointsAgainstChange = (e:any) => {
        //set name variable
        setPointsAgainst(e.target.value);
    }

    //state variables

    //variable that handles the visibility of ok and cancel confirmation buttons to delete game
    const[show,setShowDelete] = React.useState<boolean>(false);
    const[showEdit,setShowEdit] = React.useState<boolean>(false);
    
    //variables for edit buttons
    const[pointsFavor,setPointsFavor] = React.useState<string>("");
    const[pointsAgainst,setPointsAgainst] = React.useState<string>("");
    


    return(
        // If team is playing local show team on top, otherwise show on bottom
        (gameData.local===true)?
        <>
            <div  className = "bg-white shadow-md shadow-slate-400 rounded-lg py-2 pl-5 pr-4">
                <table>
                    <tr>
                        <td className='font-semibold'><Team name={myTeamName} image={myTeamImage}/></td>
                        <td style={{ display:(!showEdit ? "flex":"none") }} className='pl-3 font-semibold'>{gameData.goalsFavor}</td>
                        {/* <td><div><input value={pointsAgainst} maxLength={100} onChange={onPointsAgainstChange} className="bg-gray-200" id="txtGoalsAgainst" type="text" /></div></td> */}
                        <td style={{ display:(showEdit ? "flex":"none") }} className='pl-2 pt-1'>
                            <div>
                                <input value={pointsFavor} maxLength={100} onChange={onPointsFavorChange} className="max-w-[22px] max-h-[20px] border-2 border-slate-300 text-center" id="txtPointsFavor" type="text" />
                            </div>
                        </td>
                    </tr>
                   
                    <tr>
                        <td className='py-3 text-center' colSpan={2}>
                            {Moment(gameData.date.toString()).format('ddd MMM Do, YYYY hh:mm a')}
                        </td>
                    </tr>
                    <tr>
                        <td><Team name={rivalName} image={rivalImage}/></td>
                        <td style={{ display:(!showEdit ? "flex":"none") }} className='pl-3'>{gameData.goalsAgainst}</td>
                        <td style={{ display:(showEdit ? "flex":"none") }} className='pl-2 pt-1'>
                            <div>
                                <input value={pointsAgainst} maxLength={100} onChange={onPointsAgainstChange} className="max-w-[22px] max-h-[20px] border-2 border-slate-300 text-center" id="txtPointsAgainst" type="text" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='text-center' colSpan={2}>
                            <button id="btnDelete" className="text-blue-600 pl-1 pr-1" onClick={confirmationToggle}><i className="fa-solid fa-trash-can"></i></button>
                            <button id="btnEdit" className="text-blue-600 pl-1 pr-1" onClick={editToggle}><i className="fa-sharp fa-solid fa-pen-to-square"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td className='text-center' colSpan={2} style={{ display:(show ? "flex":"none") }}>
                            <div>Are you sure? </div>
                            <button id="btnSubmit" className="bg-red-700 text-[#FFF] ml-1 pl-1 pr-1 " onClick={onDelete}>Delete</button>
                            <button id="btnSubmitCancel" className="bg-green-500 text-[#000] ml-1 pl-1 pr-1 " onClick={confirmationToggle}>Cancel</button>
                        </td>
                    </tr>
                    <tr>
                        <td className='text-center' colSpan={2} style={{ display:(showEdit ? "flex":"none") }}>
                            <div>Save score? </div>
                            <button id="btnSubmitScore" className="bg-green-500 text-[#000] ml-1 pl-1 pr-1 " onClick={onDelete}>Save</button>
                            <button id="btnSubmitCancelScore" className="bg-green-500 text-[#000] ml-1 pl-1 pr-1 " onClick={editToggle}>Cancel</button>
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
                        <td style={{ display:(!showEdit ? "flex":"none") }} className='pl-3'>{gameData.goalsAgainst}</td>
                        <td style={{ display:(showEdit ? "flex":"none") }} className='pl-2 pt-1'>
                            <div>
                                <input value={pointsAgainst} maxLength={100} onChange={onPointsAgainstChange} className="max-w-[22px] max-h-[20px] border-2 border-slate-300 text-center" id="txtPointsAgainst2" type="text" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='py-3' colSpan={2}>
                            {Moment(gameData.date.toString()).format('ddd MMM Do, YYYY hh:mm a')}
                        </td>
                    </tr>
                    <tr>
                        <td className='font-semibold'><Team name={myTeamName} image={myTeamImage}/></td>
                        <td style={{ display:(!showEdit ? "flex":"none") }} className='pl-3 font-semibold'>{gameData.goalsFavor}</td>
                        <td style={{ display:(showEdit ? "flex":"none") }} className='pl-2 pt-1'>
                            <div>
                                <input value={pointsFavor} maxLength={100} onChange={onPointsFavorChange} className="max-w-[22px] max-h-[20px] border-2 border-slate-300 text-center" id="txtPointsFavor2" type="text" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='text-center' colSpan={2}>
                            <button id="btnSubmit" className="text-blue-600 pl-1 pr-1" onClick={confirmationToggle}><i className="fa-solid fa-trash-can"></i></button>
                            <button id="btnEdit" className="text-blue-600 pl-1 pr-1" onClick={editToggle}><i className="fa-sharp fa-solid fa-pen-to-square"></i></button>
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