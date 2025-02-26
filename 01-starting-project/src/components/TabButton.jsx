export default function TabButton(props) {
  return (
    <li>
      <button onClick={props.onClickFunc}>{props.children}</button>
    </li>
  );
}
