export default (req, res) => {
  if (req.method == "GET") {
    const url = "https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/bd6-A75yrwreEYULYMPvEwsFbZqczfIk-A7Ve2btXESx4Q";

    fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      // mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "X-Riot-Token": process.env.RIOT_API_KEY,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        let counter = 0;
        let matchDetail = {};
        for (const element of data["matches"]) {
          let result = await getMatchLoss(element.gameId);
          if (result.outcome == "Fail") {
            matchDetail = result;
            break;
          }
        }

        console.log(matchDetail, "test");

        return res.status(200).json({ data: matchDetail.gameTime });
      })
      .catch((err) => res.status(400).json({ message: err }));
  }
};

const getMatchLoss = async (gameId) => {
  const matchUrl = `https://na1.api.riotgames.com/lol/match/v4/matches/${gameId}`;
  console.log(matchUrl);
  const res = await fetch(matchUrl, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "X-Riot-Token": "RGAPI-cc4e816a-52c4-47b2-80a2-e67a4c413486",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const data = await res.json();
  let userParticipantId = -1;
  for (const element of data["participantIdentities"]) {
    if (element.player.summonerName == "Actz") {
      userParticipantId = element.participantId;
    }
  }

  const userTeamId = data["participants"][userParticipantId - 1]["teamId"];
  console.log(userTeamId);

  const outcome = userTeamId == 100 ? data["teams"][0]["win"] : data["teams"][1]["win"];
  console.log(outcome);

  const obj = {
    outcome: outcome,
    gameTime: new Date(data.gameCreation),
    rest: data,
  };

  return obj;
};
