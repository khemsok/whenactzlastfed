import { useState, useEffect } from "react";

// MUI
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

// Helper
import { winPercentage } from "../utils/helper";

function UserStats() {
  const [userStats, setUserStats] = useState({});
  useEffect(() => {
    const url = new URL("/api/userstats", document.baseURI);
    fetch(url.toString())
      .then((res) => res.json())
      .then((data) => setUserStats(data["data"]));
  }, []);
  console.log(userStats);
  const toRender =
    Object.keys(userStats).length === 0 ? (
      <CircularProgress />
    ) : (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <Typography variant="h5">{userStats.summonerName}</Typography>
        <div>
          <Typography>
            {userStats.tier} {userStats.rank}
          </Typography>
        </div>
        <Typography>
          {userStats.leaguePoints} LP | {userStats.wins} W {userStats.losses} L
        </Typography>
        <Typography>Win Ratio: {winPercentage(userStats.wins, userStats.losses)}</Typography>
      </div>
    );
  return <>{toRender}</>;
}

export default UserStats;
