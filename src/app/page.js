import Image from "next/image";
import styles from "./page.module.css";

//set title to "Home"
export const metadata = {
    title: "Home",
    description: "Home"

};


const Characters = require('../Characters.json');
import { Character } from "../Character.js";

export default function Home() {
  return (
    <main className={styles.main}>
    <h1>Developed by Enspiron</h1>

    </main>
  );
}
