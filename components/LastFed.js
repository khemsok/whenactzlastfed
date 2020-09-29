import { useState, useEffect } from "react";

import moment from "moment";

// MUI
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

function LastFed() {
  const [lastFedDateTime, setLastFedDateTime] = useState("");
  useEffect(() => {
    const url = new URL("/api/usermatchhistory", document.baseURI);
    fetch(url.toString())
      .then((res) => res.json())
      .then((data) => {
        setLastFedDateTime(data.data);
        // console.log(typeof data);
        // data.forEach((element) => {
        //   console.log(element.gameId);
        // });
      });
  }, []);

  const toRender = lastFedDateTime === "" ? <CircularProgress /> : <h1>{moment(lastFedDateTime).fromNow()}</h1>;
  return (
    <>
      <Typography>Last Fed</Typography>
      {toRender}
    </>
  );
}

export default LastFed;
