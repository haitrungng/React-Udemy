import reactImg from "./../assets/react-core-concepts.png";

function Header() {
  const reactDescription = ["Fundemental", "Core", "Crucial"];
  function getRandomInt(max) {
    return Math.round(Math.random() * max);
  }
  console.log("rendering Header");
  return (
    <header>
      <img src={reactImg} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {reactDescription[getRandomInt(2)]} React concepts you will need for
        almost any app you are going to build!
      </p>
    </header>
  );
}

export default Header;
