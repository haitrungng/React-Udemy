import logo from "../assets/logo.png";
// import "./styles/Header.css";

export default function Header() {
  return (
    <header>
      <img src={logo} alt="A canvas" />
      <h1 className="underline">ReactArt</h1>
      <p>A community of artists and art-lovers.</p>
    </header>
  );
}
