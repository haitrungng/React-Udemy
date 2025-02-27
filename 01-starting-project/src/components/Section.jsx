export default function Section({ title, children, ...props }) {
  return (
    // id, className, style, etc. are passed to the section element
    // as props
    <section {...props}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
