export default function TabButton(props) {
  return (
    <li>
      <button
        onClick={props.onClickFunc}
        className={props.isSelected ? "active" : ""}
      >
        {props.children}
      </button>
    </li>
  );
}
