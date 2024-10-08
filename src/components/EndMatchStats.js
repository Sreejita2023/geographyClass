import { useContext } from "react";
import { GameContext } from "../context/GameContext";
import { useEffect } from "react";

export default function EndMatchStats(email) {
  const {
    playerWon,
    matchSilhouettesColumns,
    guessedCountriesCounter,
    failedGuessingAttempts,
    minutes,
    seconds,
  } = useContext(GameContext);
  
  

  return (
    <>
      <figure className="endMatchStats">
        <h1>Match Status</h1>
        <div className="individualStat">
          <h1>Guessed countries:</h1>
          <h2>
            {guessedCountriesCounter}/{matchSilhouettesColumns.length}
          </h2>
        </div>
      
        {playerWon ? (
          <div className="individualStat">
            <h1>Match duration:</h1>
            <h2>
              <p>
                {minutes}m:{seconds}s
              </p>
            </h2>
          </div>
        ) : null}
      </figure>
    </>
  );
}
