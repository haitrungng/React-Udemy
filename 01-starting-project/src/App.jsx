import CoreConcept from "./components/CoreConcept";
import Header from "./components/Header";
import componentImg from "./assets/components.png";
import { CORE_CONCEPTS } from "./data";
import TabButton from "./components/TabButton";

function App() {
  function handleTabClick(btnName) {
    console.log(btnName);
  }
  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Time to get started!</h2>
          <ul>
            {CORE_CONCEPTS.map((concept, _) => (
              <CoreConcept
                title={concept.title}
                desc={concept.description}
                img={concept.image}
              />
            ))}
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton
              onClickFunc={() => handleTabClick("Components".toLowerCase())}
            >
              Components
            </TabButton>
            <TabButton onClickFunc={() => handleTabClick("JSX".toLowerCase())}>
              JSX
            </TabButton>
            <TabButton
              onClickFunc={() => handleTabClick("Props".toLowerCase())}
            >
              Props
            </TabButton>
            <TabButton
              onClickFunc={() => handleTabClick("State".toLowerCase())}
            >
              State
            </TabButton>
          </menu>
        </section>
      </main>
    </div>
  );
}

export default App;
