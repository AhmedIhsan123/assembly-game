import { useState } from "react";
import { languages } from "./languages.js";
import clsx from "clsx";

export default function AssemblyEndgame() {
	// Create a state to track the current word
	const [currentWord, setCurrentWord] = useState("react");

	// State to hold user gueses
	const [userGuesses, setUserGuesses] = useState(new Set());

	// Derived values
	let wrongGuessCount = 0;
	userGuesses.forEach((guess) => {
		if (!currentWord.includes(guess)) wrongGuessCount++;
	});
	const isGameWon = currentWord
		.split("")
		.every((letter) => userGuesses.has(letter));
	const isGameLost = wrongGuessCount >= languages.length - 1;
	const isGameOver = isGameWon || isGameLost;

	// Alphabet for the keyboard
	const alphabet = "abcdefghijklmnopqrstuvwxyz";

	// Creating our languages elements
	const languageElements = languages.map((lang, index) => {
		const isLanguageLost = index < wrongGuessCount;
		const className = clsx("chip", isLanguageLost && "lost");
		const styles = {
			backgroundColor: lang.backgroundColor,
			color: lang.color,
		};
		return (
			<span className={className} style={styles} key={lang.name}>
				{lang.name}
			</span>
		);
	});

	// Creating the secret word spans
	const wordElements = currentWord.split("").map((letter, index) => {
		return (
			<span key={index}>
				{userGuesses.has(letter) ? letter.toUpperCase() : ""}
			</span>
		);
	});

	// Creating the keyboard elements
	const keyboardElements = alphabet.split("").map((letter) => {
		const isGuessed = userGuesses.has(letter);
		const isCorrect = isGuessed && currentWord.includes(letter);
		const isWrong = isGuessed && !currentWord.includes(letter);
		const className = clsx({
			correct: isCorrect,
			wrong: isWrong,
		});

		return (
			<button
				className={className}
				key={letter}
				value={letter}
				onClick={() => {
					handleGuess(letter);
				}}
			>
				{letter.toUpperCase()}
			</button>
		);
	});

	const gameStatusClass = clsx("game-status", {
		won: isGameWon,
		lost: isGameLost,
	});

	// Handle letter guess
	function handleGuess(letter) {
		setUserGuesses((prev) => new Set(prev).add(letter));
	}

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
			<section className={gameStatusClass}>
				{isGameOver ? (
					isGameWon ? (
						<>
							<h2>You win!</h2> <p>Well done!</p>
						</>
					) : (
						<>
							<h2>You lose!</h2> <p>Better start learning Assembly!</p>
						</>
					)
				) : null}
			</section>
			<section className="language-chips">{languageElements}</section>
			<section className="word">{wordElements}</section>
			<section className="keyboard">{keyboardElements}</section>
			{isGameOver && <button className="new-game">New Game</button>}
		</main>
	);
}
