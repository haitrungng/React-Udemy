import CoreConcept from "./CoreConcept";
import { CORE_CONCEPTS } from "../data";

export default function CoreConcepts(props) {
  console.log("rendering CoreConcepts");
  return (
    <section id="core-concepts">
      <h2>Time to get started!</h2>
      <ul>
        {CORE_CONCEPTS.map((concept, idx) => (
          <CoreConcept {...concept} key={idx} />
        ))}
      </ul>
    </section>
  );
}
