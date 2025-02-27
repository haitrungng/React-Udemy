export default function Tabs({ children, button, ButtonContainer }) {
  return (
    <>
      <ButtonContainer>{button}</ButtonContainer>
      {children}
    </>
  );
}
