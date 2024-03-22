import Image from "next/image";
import styles from "./page.module.css";
import Button from "@mui/material/Button";
import PwaModal from './Components/PwaModal.js'
import darkmode from "./Darkmode.js";
// import Darkmode from "./Darkmode.js";
//set title to "Home"
export const metadata = {
  title: "Home",
  description: "Home",
};

const Characters = require("./characters.json");
import { Character } from "../Character.js";

export default function Home() {
  return (
    <main >
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >Developed by Enspiron</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
      <p>Currently in Development </p>
      <Button variant="contained" href="https://wfjukebox.com">
        Main Site
      </Button>
      {/* <Darkmode/> */}
      {/* <PwaModal /> */}
      </div>
    </main>
  );
}
