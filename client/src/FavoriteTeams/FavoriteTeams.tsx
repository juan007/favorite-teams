import { useNavigate } from "react-router-dom";
import {ComponentPropsFavoriteTeams,MyTeam } from "../Tools/data.model";
import '../../node_modules/@fortawesome/fontawesome-free/css/all.css';

const FavoriteTeams = ({ myTeams, teams, getData }:ComponentPropsFavoriteTeams) => {
    
    const onMyTeamChange = (e:any)=> {
        getData();
        navigate('/TeamCalendar/' + e.target.value);
    }
    
    const navigate = useNavigate();
    // ---------------------------------- render to the DOM
    return(
        (myTeams!==undefined && teams!==undefined )?
        <div className="flex flex-wrap grid place-items-center ">
            <div className="flex flex-row flex-nowrap pr-1">
                <select id="lstSamples" 
                    className="bg-gray-200 hover:bg-opacity-90 text-[#035074] py-2 px-3 rounded mb-3"
                    onChange={onMyTeamChange}>
                    <option value={0}>Select team ...</option>
                    {myTeams!.map((data:MyTeam,n:number) => {
                            return <option key={n} value={data.code}>{data.name}</option>
                    })}
                </select>

                {/* {myTeams.map((data:MyTeam, n:number)=>
                    <div key={n} className="">
                        <div className="font-semibold max-w-md p-1  border-l-4 border-solid border-gray-500 max-h-9">
                        <Link to={`/TeamCalendar/${data.code}`}>
                            <FavoriteTeam name={data.name} image={teams.find(item=>item.code===data.code)!.image}/>
                        </Link>
                        </div>
                    </div>
                )} */}
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