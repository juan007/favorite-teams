import { useParams, Link } from "react-router-dom";
import { ComponentPropsTeamCalendar, MyTeam, Game } from "../Tools/data.model";
import "../../node_modules/@fortawesome/fontawesome-free/css/all.css";

import GameDetail from "../GameDetail/GameDetail";

//Component that shows the games of a selected team ordered by game date
const TeamCalendar = ({
  myTeams,
  teams,
  setLoEnabled,
  getData,
}: ComponentPropsTeamCalendar) => {
  //Selected Team Code sent by URL
  let { code } = useParams<{ code: string }>();
  let myTeam: MyTeam | undefined = myTeams.find((item) => item.code === code);
  let myTeamImage: string | undefined = teams.find((item) => item.code === code)?.image;
  // ---------------------------------- render to the DOM
  return myTeam !== undefined ? (
    <div className="flex flex-wrap grid place-items-center">
      <div className="flex flex-col flex-nowrap pr-5">
        <div className="text-blue-600 font-bold text-center text-xl pt-7 font-serif">{myTeam.name}</div>
        <Link
          title="CLICK TO CREATE AN UPCOMING OR ALREADY PLAYED GAME FOR YOUR TEAM"
          to={`/newGame/` + myTeam.code}
          className="text-blue-600 font-bold text-center pt-4"
        >
          NEW GAME <i className="fa-solid fa-plus"></i>
        </Link>
        <div className="pt-3 text-center">Played and Upcoming Matches: </div>
        <div className="grid grid-cols-2 gap-4">
          {/*before mapping we sort the array by date(from recent to past)*/}
          {myTeam.games
            .sort((a, b) => (a.date < b.date ? 1 : b.date < a.date ? -1 : 0))
            .map((data: Game, n: number) => (
              <div key={n} className="py-3">
                <div className="text-accent font-sans">
                  <GameDetail
                    myTeamName={myTeam!.name}
                    myTeamImage={myTeamImage!}
                    rivalName={teams.find((item) => item.code === data.rivalCode)!.name}
                    rivalImage={teams.find((item) => item.code === data.rivalCode)!.image}
                    gameData={data}
                    myTeamCode={myTeam!.code}
                    setLoEnabled={setLoEnabled}
                    getData={getData}
                  />
                </div>
              </div>
            ))}
        </div>
        <Link
          title="CLICK TO CREATE AN UPCOMING OR ALREADY PLAYED GAME FOR YOUR TEAM"
          to={`/newGame/` + myTeam.code}
          className="text-blue-600 font-bold text-center"
        >
          NEW GAME <i className="fa-solid fa-plus"></i>
        </Link>
      </div>
    </div>
  ) : (
    <div className="pt-2">
      <div className="font-bold">
        <i className="fas fa-arrow-left content__button pr-2 text-xl hover:text-accent"></i>Error
      </div>
      <div className="max-w-3xl pb-4">Team does not exist in database</div>
</div>
);
};

export default TeamCalendar;
