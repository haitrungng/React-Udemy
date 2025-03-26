export default function UserInput({ onSetInput }) {
  function handleInputChange(name, value) {
    onSetInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }
  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label htmlFor="initial-investment">initial investment</label>
          <input
            type="number"
            id="initial-investment"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleInputChange("initialInvestment", Number(e.target.value));
                e.target.blur();
              }
            }}
            onBlur={(e) =>
              handleInputChange("initialInvestment", Number(e.target.value))
            }
          />
        </p>
        <p>
          <label htmlFor="annual-investment">annual investment</label>
          <input
            type="number"
            id="annual-investment"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.target.blur();
                handleInputChange("annualInvestment", Number(e.target.value));
              }
            }}
            onBlur={(e) =>
              handleInputChange("annualInvestment", Number(e.target.value))
            }
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="return">Expected return</label>
          <input
            type="number"
            id="return"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.target.blur();
                handleInputChange("expectedReturn", Number(e.target.value));
              }
            }}
            onBlur={(e) =>
              handleInputChange("expectedReturn", Number(e.target.value))
            }
          />
        </p>
        <p>
          <label htmlFor="duration">duration</label>
          <input
            type="number"
            id="duration"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.target.blur();
                handleInputChange("duration", Number(e.target.value));
              }
            }}
            onBlur={(e) =>
              handleInputChange("duration", Number(e.target.value))
            }
          />
        </p>
      </div>
    </section>
  );
}
