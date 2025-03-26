import Counter from "./components/Counter";
import Header from "./components/Header";
import Auth from "./components/Auth";
import UserProfile from "./components/UserProfile";

import { useSelector } from "react-redux";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  console.log("isAuth in App.js", isAuth);
  return (
    <>
      <Header />
      {isAuth ? <UserProfile /> : <Auth />}

      <Counter />
    </>
  );
}

export default App;
