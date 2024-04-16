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
          <button className="calculator-button" onClick={() => updateCalc("9")}>
            9
          </button>
          <button className="calculator-button" onClick={() => updateCalc("8")}>
            8
          </button>
          <button className="calculator-button" onClick={() => updateCalc("7")}>
            7
          </button>
          <button className="calculator-button" onClick={() => updateCalc("6")}>
            6
          </button>
          <button className="calculator-button" onClick={() => updateCalc("5")}>
            5
          </button>
          <button className="calculator-button" onClick={() => updateCalc("4")}>
            4
          </button>
          <button className="calculator-button" onClick={() => updateCalc("3")}>
            3
          </button>
          <button className="calculator-button" onClick={() => updateCalc("2")}>
            2
          </button>
          <button className="calculator-button" onClick={() => updateCalc("1")}>
            1
          </button>
          <button className="calculator-button" onClick={() => updateCalc("0")}>
            0
          </button>
          <button className="calculator-button" onClick={() => updateCalc(".")}>
            .
          </button>

          <button className="calculator-button" onClick={() => calculate()}>
            =
          </button>
          <button className="calculator-button" onClick={() => clearAll()}>
            Clear
          </button>
          <button className="calculator-button" disabled>
            {" "}
            Calculator
          </button>
          <button className="calculator-button" disabled>
            {" "}
            Get that PR!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
