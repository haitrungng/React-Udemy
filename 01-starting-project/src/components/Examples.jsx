import { useState } from "react";
import TabButton from "./TabButton";
import { EXAMPLES } from "./../data";
import Section from "./Section";
import Tabs from "./Tabs";

export default function Examples(props) {
  console.log("rendering Examples");
  const [activeTab, setActiveTab] = useState();

  function handleTabClick(btnName) {
    setActiveTab(btnName);
  }
  let tabContent = <>Please select a tab</>;

  if (EXAMPLES[activeTab]) {
    tabContent = (
      <>
        <h3>{EXAMPLES[activeTab].title}</h3>
        <p>{EXAMPLES[activeTab].description}</p>
        <pre>
          <code>{EXAMPLES[activeTab].code}</code>
        </pre>
      </>
    );
  }

  return (
    <Section id="examples" title="Examples">
      <Tabs
        button={
          <>
            <TabButton
              onClickFunc={() => handleTabClick("Components".toLowerCase())}
              isSelected={activeTab === "components"}
            >
              Components
            </TabButton>
            <TabButton
              onClickFunc={() => handleTabClick("JSX".toLowerCase())}
              isSelected={activeTab === "jsx"}
            >
              JSX
            </TabButton>
            <TabButton
              onClickFunc={() => handleTabClick("Props".toLowerCase())}
              isSelected={activeTab === "props"}
            >
              Props
            </TabButton>
            <TabButton
              onClickFunc={() => handleTabClick("State".toLowerCase())}
              isSelected={activeTab === "state"}
            >
              State
            </TabButton>
          </>
        }
        ButtonContainer="menu"
      >
        <div id="tab-content">{tabContent}</div>
      </Tabs>
    </Section>
  );
}
