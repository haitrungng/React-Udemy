import Player from "./components/Player.jsx";
import TimerChallenge from "./components/TimerChallenge.jsx";

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimerChallenge title="Challenge 1" targetTime={1} />
        <TimerChallenge title="Challenge 1" targetTime={10} />
        <TimerChallenge title="Challenge 1" targetTime={10} />
        <TimerChallenge title="Challenge 1" targetTime={10} />
      </div>
    </>
  );
}

export default App;
