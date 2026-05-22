import { useState } from "react";
import { languages } from "./languages.js";

export default function AssemblyEndgame() {
	// Create a state to track the current word
	const [currentWord, setCurrentWord] = useState("react");

	// Alphabet for the keyboard
	const alphabet = "abcdefghijklmnopqrstuvwxyz";

	// Creating our languages elements
	const languageElements = languages.map((lang) => {
		const styles = {
			backgroundColor: lang.backgroundColor,
			color: lang.color,
		};
		return (
			<span className="chip" style={styles} key={lang.name}>
				{lang.name}
			</span>
		);
	});

	// Creating the secret word spans
	const wordElements = currentWord.split("").map((letter, index) => {
		return <span key={index}>{letter.toUpperCase()}</span>;
	});

	// Creating the keyboard elements
	const keyboardElements = alphabet.split("").map((letter) => {
		return (
			<button key={letter} value={letter}>
				{letter.toUpperCase()}
			</button>
		);
	});

	// Final return statement
	return (
		<main>
			<header>
				<h1>Assembly: Endgame</h1>
				<p>
					Guess the word within 8 attempts to keep the programming world safe
					from Assembly!
				</p>
			</header>
			<section className="game-status">
				<h2>You win!</h2>
				<p>Well done! 🎉</p>
			</section>
			<section className="language-chips">{languageElements}</section>
			<section className="word">{wordElements}</section>
			<section className="keyboard">{keyboardElements}</section>
			<button className="new-game">New Game</button>
		</main>
	);
}
