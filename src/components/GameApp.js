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
  } = useContext(GameContext);
  const [email, setEmail] = useState(null); // State to store the email
  const location = useLocation(); // Access the current URL parameters

  useEffect(() => {
    // Extract the email from the query parameters in the URL
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get("email");

    if (emailParam) {
      setEmail(emailParam); // Store email in state
      console.log("Email extracted from URL:", emailParam); // Debugging
    } else {
      console.log("No email found in URL");
    }
  }, [location]);
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
