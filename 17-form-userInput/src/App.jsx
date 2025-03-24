import Header from "./components/Header.jsx";
import Login from "./components/StateLogin.tsx";
import Signup from "./components/SignUp.tsx";

function App() {
  return (
    <div style={{ maxHeight: "100vh", overflow: "hidden" }}>
      <Header />
      <main>
        {/* <Login /> */}
        <Signup />
      </main>
    </div>
  );
}

export default App;
