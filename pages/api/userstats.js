export default (req, res) => {
  if (req.method == "GET") {
    const url = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/qFi6QwjYGug6iAa-vASAjqzPDozMm16NI9Ah0C4jslQWI94";

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
      .then((data) => {
        console.log(data);
        return res.status(200).json({ data: data[0] });
      })
      .catch((err) => res.status(400).json({ message: err }));
  }
};
