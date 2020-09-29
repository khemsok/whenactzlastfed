import { useEffect } from "react";

// Components
import Navbar from "../components/Navbar";
import UserStats from "../components/UserStats";
import Search from "../components/Search";
import LastFed from "../components/LastFed";
// MUI
import Container from "@material-ui/core/Container";

export default function Home() {
  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Search />
        <UserStats />
        <LastFed />
      </Container>
    </>
  );
}
