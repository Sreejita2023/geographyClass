import { useContext, useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { GameContext } from "../context/GameContext";
import { useLocation } from "react-router-dom";
import DraggableFlagsContainer from "./DraggableFlagsContainer";
import EndMatchStats from "./EndMatchStats";
import Footer from "./Footer";
import HowToPlayBox from "./HowToPlayBox";
import SilhouettesGridContainer from "./SilhouettesGridContainer";
import Timer from "./Timer";

export default function GameApp() {
  const {
    startMatch,
    setStartMatch,
    matchEnded,
    setMatch,
    handleOnDragEnd,
    matchLocation,
    guessedCountriesCounter,
  } = useContext(GameContext);

  const [email, setEmail] = useState(null); // State to store the email
  const location = useLocation(); // Access the current URL parameters
  useEffect(() => {
   
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get("email");

    if (emailParam) {
      setEmail(emailParam); // Store email in state
      console.log("Email extracted from URL:", emailParam); // Debugging
    } else {
      // placing a demoEmail
      setEmail("test@gmail.com");
      console.log("No email found in URL");
    }

     // Only trigger the effect if matchEnded is true
    if (matchEnded) {
      console.log("Match has ended, executing the logic.");

      // logic for game success or failure
      const result = guessedCountriesCounter === 6 ? "win" : "lose";
      console.log(result);
      const updateSoloResults = async () => {
        try {
          // The data to be sent in the body of the request
          const data = {
            email: "test@gmail.com", // Replace with actual player email
          };
          console.log(data);

          // Make a POST request to the backend API using fetch
          const response = await fetch(
            "https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/updateSoloResults",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email,
                result: result,
              }),
            }
          );

          // Check if the response is successful
          if (response.ok) {
            console.log("Match result updated successfully.");

            // Redirect to home page after 3 seconds (3000 milliseconds)
            setTimeout(() => {
              window.location.href = `https://zealous-bush-02641ff00.5.azurestaticapps.net/?matchResult=${result}`;
            }, 3000);
          } else {
            // Handle HTTP errors by logging the status and statusText
            console.error(
              `Failed to update match result: ${response.status} ${response.statusText}`
            );
          }
        } catch (error) {
          // Handle fetch or network errors
          console.error("Error while updating match result:", error);
        }
      };

      // Call the function as soon as matchEnded is true
      updateSoloResults();
    }
  }, [matchEnded, guessedCountriesCounter, location]);

  return (
    <>
      <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
        <main>
          {!startMatch ? (
            <>
              <Footer />
              <img
                src={"assets/misc/3d-mini-globe.png"}
                height={180}
                alt="Game Preview"
                style={{ margin: "15px 0px" }}
              />
              <button
                className="playAgainBtn"
                onClick={() => setStartMatch(true)}
              >
                Play
              </button>
              <HowToPlayBox />
              {email ? (
                <p>Email: {email}</p>
              ) : (
                <p>Loading email...</p> // Display a placeholder while email is being fetched
              )}
            </>
          ) : matchEnded ? (
            <>
              <EndMatchStats />
              <button onClick={setMatch} className="playAgainBtn">
                Play again
              </button>
              <Footer />
            </>
          ) : (
            <>
              <figure className="locationBox">
                <h1>Location:</h1>
                <p>{matchLocation}</p>
              </figure>

              <section className="gameplaySection">
                <SilhouettesGridContainer />
                <aside>
                  <Timer />
                  <DraggableFlagsContainer />
                </aside>
              </section>
              <HowToPlayBox />
              <Footer />
            </>
          )}
        </main>
      </DragDropContext>
    </>
  );
}
