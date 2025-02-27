import { useState } from "react";
import CaculationOutput from "./components/CaculationOutput";
import UserInput from "./components/UserInput";

const INIT_INPUT = {
  initialInvestment: 0,
  annualInvestment: 0,
  expectedReturn: 0,
  duration: 0,
};

function App() {
  const [input, setInput] = useState({ INIT_INPUT });
  return (
    <>
      <UserInput onSetInput={setInput} />
      <CaculationOutput input={input} />
    </>
  );
}

export default App;
