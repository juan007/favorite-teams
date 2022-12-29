import React from 'react';

import { Link, useNavigate, useParams } from "react-router-dom";

import {sendJSONData} from "../Tools/Toolkit";

import {Team } from "../Tools/data.model";

const SUBMIT_SCRIPT:string = "http://localhost/put";
//const SUBMIT_SCRIPT:string = "/post/courses";

const NewGame = ({setLoEnabled, getData, teams}:{setLoEnabled:Function, getData:Function,teams:Team[]}) => {
    
    let { teamCode } = useParams<{teamCode:string}>();
    let Team:(Team | undefined) = teams.find(item=>item.code===teamCode);
    //When the submit game button is pressed
    const onSubmit = (e:any) => {
        if(date!="")
        {
            setLoEnabled(true);
            let sendJSON = 
            {
                "teamCode":teamCode,
                "date": date,
                "pointsFavor": pointsFavor,
                "pointsAgainst": pointsAgainst,
                "rivalCode": rivalCode,
                "local": local
            };

        //serelization.-convert the JSON object to a string 
        let sendString:string = JSON.stringify(sendJSON);
        //send the JSON data to the WEb API
        sendJSONData(SUBMIT_SCRIPT,sendString, onSubmitResponse, onSubmitError,'PUT');

        //Reset form and hide error message
        
        
        setErrorMessage(false);
        

        } else {
            //Show error message
            setErrorMessage(true);
        }
    }

    
    //When the game was successfully registered
    const onSubmitResponse = ()=> {
        getData();
        navigate('/TeamCalendar/'+teamCode);
        
    }

    const onSubmitError = (error:any)=> {
        console.log('Error occured with data submit');
    }

    const onDateChange = (e:any) => {
        //set date variable
        setDate(e.target.value);
        
        if(date!="")
            setErrorMessage(false);
            
    }

    const onRivalChange = (e:any) => {
        //set rival variable
        console.log(e.target.value);
        setRivalCode(e.target.value);
        
        
        if(date!="")
            setErrorMessage(false);
    }

    const onPointsFavorChange = (e:any) => {
        //set points in favor variable
        setPointsFavor(e.target.value);
        
        if(date!="")
            setErrorMessage(false);
    }

    const onPointsAgainstChange = (e:any) => {
        //set name variable
        setPointsAgainst(e.target.value);
        
        if(date!="")
            setErrorMessage(false);
    }

    const onLocalClick = (e:any) => {
        //set local variable
        (local===true)?setLocal(false):setLocal(true);
        
        
        if(date!="" && rivalCode!="")
            setErrorMessage(false);
    }

    //---------State variables
    const navigate = useNavigate();
    const[date,setDate] = React.useState<string>("");
    const[pointsFavor,setPointsFavor] = React.useState<number>();
    const[pointsAgainst,setPointsAgainst] = React.useState<number>();
    const[rivalCode,setRivalCode] = React.useState<string>((teams[0].code==teamCode)?teams[1].code:teams[0].code);
    const[local,setLocal] = React.useState<boolean>(false);
    
    const[errorMessage,setErrorMessage] = React.useState<boolean>(false);
    
    return(
        <div className = "flex flex-col flex-wrap pt-10">
            <div className='self-center'>
            <div className="text-green-500 font-bold">Add New Game</div><br></br>
            <div><label className='font-bold'>Team</label></div>
            <div><label>{Team?.name}</label></div><br/>
            <div><label className='font-bold'>Date</label></div>
            <div><input value={date} maxLength={100} onChange={onDateChange} className="bg-gray-200" id="txtDate" type="datetime-local" /></div><br/>
            <div><label className='font-bold'>Rival</label></div>
            <div>
                <select id="lstSamples" 
                    className="bg-gray-200 hover:bg-opacity-90 text-[#035074] py-2 px-3 rounded mb-3"
                    onChange={onRivalChange}>
                    {/* adding options to the dropdown based on samples state variable */}
                    {teams.map((data:Team,n:number) => {
                        if(data.code!==teamCode)
                            return <option key={n} value={data.code}>{data.name}</option>
                    })}
                </select>
            </div><br/>
            <div><label className='font-bold'>Points in favor</label></div>
            <div><input value={pointsFavor} maxLength={100} onChange={onPointsFavorChange} className="bg-gray-200" id="txtGoalsFavor" type="text" /></div><br/>
            <div><label className='font-bold'>Points against</label></div>
            <div><input value={pointsAgainst} maxLength={100} onChange={onPointsAgainstChange} className="bg-gray-200" id="txtGoalsAgainst" type="text" /></div><br/>
            <div><label className='font-bold'>Is your team playing Local ?</label></div>
            <div>
            {/* <input id="more-info" name="more-info" type="checkbox" onChange={onLocalClick}/> */}
            <input type="checkbox" id="check" value={local.toString()} 
            onChange={onLocalClick}/> <span>YES</span>
            </div>
            <br/>
            <div>
                <button id="btnSubmit" className="bg-green-500 text-[#FFF] pl-1 pr-1" onClick={onSubmit}>Ok</button>
                <Link to={`/TeamCalendar/`+teamCode} className="bg-green-500 text-[#FFF] pl-1 ml-1 pr-1 pb-0.5">Cancel</Link>
            </div>
            
            <div>
                <label style={{ display:(errorMessage ? "block":"none") }} className="hidden text-red-700">Date field is required</label>
            </div>
            
        </div>
        </div>
    );
}

export default NewGame;