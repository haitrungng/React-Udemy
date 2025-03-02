import { useState, useRef } from "react";
import LeftSideBar from "./components/LeftSideBar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Model from "./components/Model";

function App() {
  const [projectState, setProjectState] = useState({
    // do nothing
    selectedProjectId: undefined,
    projects: [],
  });
  const modelRef = useRef();

  function handleStartAddProject() {
    // is adding
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: null,
    }));
  }
  function handleCancelAddProject() {
    // cancel adding
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
    }));
  }
  function handleSaveAddProject(title, desc, dueDate) {
    // save adding
    console.log("handleSaveAddProject");
    title = title.trim();
    desc = desc.trim();
    dueDate = dueDate.trim();

    if (!title || !desc || !dueDate) {
      // show error modal
      modelRef.current.showModal();
      console.log("Please fill all fields");
      return;
    }
    setProjectState((prevState) => {
      prevState.projects.push({
        id: prevState.projects.length + 1,
        title,
        desc,
        dueDate,
      });
      return {
        selectedProjectId: undefined,
        projects: prevState.projects,
      };
    });
  }

  console.log("projectState", projectState);
  let content;
  if (projectState.selectedProjectId === null)
    content = (
      <NewProject
        onCancelAddProject={handleCancelAddProject}
        onSaveAddProject={handleSaveAddProject}
      />
    );
  else if (projectState.selectedProjectId === undefined)
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;

  return (
    <>
      <Model ref={modelRef} btnCaption="Okay">
        <div className="flex flex-col items-center gap-4 p-8">
          <h2 className="text-xl font-bold text-stone-500 my-4">
            Invalid Input
          </h2>
          <p className="text-stone-400 mb-2">
            Oops... Looks like you forgot to enter a value
          </p>
          <p className="text-stone-400 mb-4">
            Please make sure you provide a valid value
          </p>
        </div>
      </Model>
      <main className="h-screen my-8 flex gap-8">
        {/* <h1 className="my-8 text-center text-5xl font-bold">Hello World</h1> */}
        <LeftSideBar
          onStartAddProject={handleStartAddProject}
          projects={projectState.projects}
        />
        {content}
      </main>
    </>
  );
}

export default App;
