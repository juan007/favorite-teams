//Component that renders a team image and name
import { ComponentPropsTeam } from '../Tools/data.model';

const Team = ({name,image} : ComponentPropsTeam) =>{


    return(
        <div  className = "flex flex-row flex-wrap justify-start items-start">
            <div><img src={'/images/' + image} width="30" height="30" alt=""/></div>
            <div className='pl-1 self-center'>{name}</div>
        </div>
    );
}

export default Team;
