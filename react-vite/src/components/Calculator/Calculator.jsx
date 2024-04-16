import { useState } from "react";
import "./Calculator.css";

function Calculator() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const ops = ["/", "*", "+", "-", "."];

  const updateCalc = (value) => {
    if (
      (ops.includes(value) && calc === "") ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }
    setCalc(calc + value);
    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };

  const createDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
    }
    return digits;
  };

  const calculate = () => {
    setCalc(eval(calc).toString());
  };

  const deleteLast = () => {
    if (calc == "") {
      return;
    } else {
      const value = calc.slice(0, -1);
      setCalc(value);
    }
  };

  const clearAll = () => {
    setCalc("");
    setResult("");
  };

  return (
    <div className="Ap">
      <div className="calculator">
        <div className="display">
          {result ? <span>({result})</span> : ""}&nbsp;
          {calc || "0"}
        </div>

        <div className="operators">
          <button className="calculator-button" onClick={() => updateCalc("/")}>
            ÷
          </button>
          <button className="calculator-button" onClick={() => updateCalc("*")}>
            x
          </button>
          <button className="calculator-button" onClick={() => updateCalc("+")}>
            +
          </button>
          <button className="calculator-button" onClick={() => updateCalc("-")}>
            -
          </button>

          <button className="calculator-button" onClick={() => deleteLast()}>
            DEL
          </button>
        </div>

        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc("0")}>0</button>
          <button onClick={() => updateCalc(".")}>.</button>

          <button onClick={() => calculate()}>=</button>
          <button onClick={() => clearAll()}>Clear</button>
          <button className="not-buttons" disabled>
            {" "}
            Calculator
          </button>
          <button className="not-buttons" disabled>
            {" "}
            Get that PR!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
