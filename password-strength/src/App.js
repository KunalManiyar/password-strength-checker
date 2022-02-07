// import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passResult, setPassResult] = useState({
    id: 0,
    value: "",
    length: 0,
    contains: [],
  });
  const defaultOptions = [
    {
      id: 0,
      value: "Too weak",
      minDiversity: 0,
      minLength: 0,
    },
    {
      id: 1,
      value: "Weak",
      minDiversity: 2,
      minLength: 6,
    },
    {
      id: 2,
      value: "Medium",
      minDiversity: 4,
      minLength: 8,
    },
    {
      id: 3,
      value: "Strong",
      minDiversity: 4,
      minLength: 10,
    },
  ];

  const escapeRegExp = (string) =>
    string.replace(/[-.*+?^${}()|[\]\\]/g, "\\$&");

  function passwordStrength(
    password,
    options = defaultOptions,
    allowedSymbols = "!@#$%^&*"
  ) {
    let passwordCopy = password || "";

    options[0].minDiversity = 0;
    options[0].minLength = 0;

    const rules = [
      {
        regex: "[a-z]",
        message: "lowercase",
      },
      {
        regex: "[A-Z]",
        message: "uppercase",
      },
      {
        regex: "[0-9]",
        message: "number",
      },
    ];

    if (allowedSymbols) {
      rules.push({
        regex: `[${escapeRegExp(allowedSymbols)}]`,
        message: "symbol",
      });
    }

    let strength = {};

    strength.contains = rules
      .filter((rule) => new RegExp(`${rule.regex}`).test(passwordCopy))
      .map((rule) => rule.message);

    strength.length = passwordCopy.length;

    let fulfilledOptions = options
      .filter((option) => strength.contains.length >= option.minDiversity)
      .filter((option) => strength.length >= option.minLength)
      .sort((o1, o2) => o2.id - o1.id)
      .map((option) => ({ id: option.id, value: option.value }));
    // console.log("\n\n");
    Object.assign(strength, fulfilledOptions[0]);

    setPassResult(strength);
  }
  const togglePassword = () => {
    if (showPassword === true) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };
  const passwordStrengthChange = (e) => {
    setPassword(e.target.value);
  };
  useEffect(() => {
    passwordStrength(password);
  }, [password]);
  return (
    <div className="main">
      <div className="result1">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          className="inputPass"
          value={password}
          onChange={(e) => passwordStrengthChange(e)}
        />
        <div className="result1-flex">
          <input type="checkbox" onChange={togglePassword} />
          <span>Show Password</span>
        </div>
      </div>
      <div className="result">
        <h1>Result</h1>
        <hr />
        <div className="result-inner">
          <h3>ID:</h3>
          <h3>{passResult.id}</h3>
        </div>
        <div className="result-inner">
          <h3>Strength Value:</h3>
          <h3>{passResult.value}</h3>
        </div>
        <div className="result-inner">
          <h3>Length:</h3>
          <h3>{passResult.length}</h3>
        </div>
        <div className="result-inner">
          <h3>Contains:</h3>
          <h3>{passResult.contains.join(" ")}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
