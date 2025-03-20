import { useState, useRef } from "react";
import LeftSideBar from "./components/LeftSideBar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Model from "./components/Model";
import SelectedProject from "./components/SelectedProject";

let taskId = Number.MIN_VALUE;
let projectId = Number.MIN_VALUE;

function App() {
  const [projectState, setProjectState] = useState({
    // do nothing
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
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
        id: projectId++,
        title,
        desc,
        dueDate,
      });
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects,
      };
    });
  }

  function handleSelectProject(projectId) {
    // select project
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: projectId,
    }));
  }

  function handleDeleteProject() {
    // delete project

    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
      projects: prevState.projects.filter(
        (project) => project.id !== prevState.selectedProjectId
      ),
    }));
  }

  function handleDeleteTask(TaskId) {
    // delete task
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => {
          if (task.ofProject === prevState.selectedProjectId) {
            return task.id !== TaskId;
          }
          return true;
        }),
      };
    });
  }

  function handleAddTask(newTask) {
    // add task
    console.log("handleAddTask");
    newTask = newTask.trim();

    if (!newTask) {
      // show error modal
      // modelRef.current.showModal();
      console.log("Please fill all fields");
      return;
    }
    setProjectState((prevState) => {
      prevState.tasks.push({
        ofProject: prevState.selectedProjectId,
        id: taskId++,
        title: newTask,
        completed: false,
      });
      return {
        ...prevState,
        tasks: prevState.tasks,
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
  else {
    const project = projectState.projects.find(
      (project) => project.id === projectState.selectedProjectId
    );
    content = (
      <SelectedProject
        project={project}
        onDeleteProject={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        tasks={projectState.tasks.filter(
          (task) => task.ofProject === projectState.selectedProjectId
        )}
      />
    );
  }
  return (
    <>
      <Model ref={modelRef} btnCaption="Okay">
        <div className="flex flex-col items-center gap-4 p-8">
          <h2 className="text-xl font-bold text-stone-800 my-4">
            Invalid Input
          </h2>
          <p className="text-stone-600 mb-2">
            Oops... Looks like you forgot to enter a value
          </p>
          <p className="text-stone-600 mb-4">
            Please make sure you provide a valid value
          </p>
        </div>
      </Model>
      <main className="h-screen my-8 flex gap-8">
        {/* <h1 className="my-8 text-center text-5xl font-bold">Hello World</h1> */}
        <LeftSideBar
          onStartAddProject={handleStartAddProject}
          projects={projectState.projects}
          onSelectProject={handleSelectProject}
        />
        {content}
      </main>
    </>
  );
}

export default App;
