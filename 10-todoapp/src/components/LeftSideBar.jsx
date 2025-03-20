import Button from "./Button";

export default function LeftSideBar({
  onStartAddProject,
  projects,
  onSelectProject,
  selectedProjectId,
}) {
  console.log("On left side bar ", projects);
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl">Your Project</h2>
      <div>
        <Button onClick={onStartAddProject}>+ Add Project</Button>
      </div>
      <ul className="mt-8">
        {projects.length > 0 &&
          projects.map((project) => {
            let cssClasses =
              "w-full text-left px-2 py-1 rounded-sm  hover:text-stone-200 hover:bg-stone-800";
            if (selectedProjectId === project.id) {
              cssClasses += " bg-stone-800 text-stone-200";
            } else cssClasses += "text-stone-400";
            return (
              <li key={project.id} className="my-4">
                <button
                  onClick={() => onSelectProject(project.id)}
                  className={cssClasses}
                >
                  {project.title}
                </button>
              </li>
            );
          })}
      </ul>
    </aside>
  );
}
