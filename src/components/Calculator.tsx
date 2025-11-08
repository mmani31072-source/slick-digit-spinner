import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(String(inputValue));
    } else if (operation) {
      const currentValue = previousValue || "0";
      const newValue = calculate(parseFloat(currentValue), inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(String(newValue));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      case "=":
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(parseFloat(previousValue), inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const toggleSign = () => {
    const newValue = parseFloat(display) * -1;
    setDisplay(String(newValue));
  };

  const inputPercent = () => {
    const newValue = parseFloat(display) / 100;
    setDisplay(String(newValue));
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      
      if (key >= "0" && key <= "9") {
        inputDigit(key);
      } else if (key === ".") {
        inputDecimal();
      } else if (key === "+" || key === "-") {
        performOperation(key === "+" ? "+" : "-");
      } else if (key === "*") {
        performOperation("×");
      } else if (key === "/") {
        event.preventDefault();
        performOperation("÷");
      } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        handleEquals();
      } else if (key === "Escape" || key === "c" || key === "C") {
        clear();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [display, previousValue, operation, waitingForOperand]);

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-card rounded-3xl p-6 shadow-[var(--shadow-elegant)]">
        {/* Display */}
        <div className="bg-calculator-display rounded-2xl p-6 mb-6 min-h-[100px] flex items-end justify-end">
          <div className="text-5xl font-light text-foreground tracking-tight break-all text-right">
            {display.length > 12 ? parseFloat(display).toExponential(6) : display}
          </div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <Button variant="secondary" size="calculator" onClick={clear}>
            AC
          </Button>
          <Button variant="secondary" size="calculator" onClick={toggleSign}>
            ±
          </Button>
          <Button variant="secondary" size="calculator" onClick={inputPercent}>
            %
          </Button>
          <Button variant="operation" size="calculator" onClick={() => performOperation("÷")}>
            ÷
          </Button>

          {/* Row 2 */}
          <Button variant="number" size="calculator" onClick={() => inputDigit("7")}>
            7
          </Button>
          <Button variant="number" size="calculator" onClick={() => inputDigit("8")}>
            8
          </Button>
          <Button variant="number" size="calculator" onClick={() => inputDigit("9")}>
            9
          </Button>
          <Button variant="operation" size="calculator" onClick={() => performOperation("×")}>
            ×
          </Button>

          {/* Row 3 */}
          <Button variant="number" size="calculator" onClick={() => inputDigit("4")}>
            4
          </Button>
          <Button variant="number" size="calculator" onClick={() => inputDigit("5")}>
            5
          </Button>
          <Button variant="number" size="calculator" onClick={() => inputDigit("6")}>
            6
          </Button>
          <Button variant="operation" size="calculator" onClick={() => performOperation("-")}>
            −
          </Button>

          {/* Row 4 */}
          <Button variant="number" size="calculator" onClick={() => inputDigit("1")}>
            1
          </Button>
          <Button variant="number" size="calculator" onClick={() => inputDigit("2")}>
            2
          </Button>
          <Button variant="number" size="calculator" onClick={() => inputDigit("3")}>
            3
          </Button>
          <Button variant="operation" size="calculator" onClick={() => performOperation("+")}>
            +
          </Button>

          {/* Row 5 */}
          <Button variant="number" size="calculator" className="col-span-2" onClick={() => inputDigit("0")}>
            0
          </Button>
          <Button variant="number" size="calculator" onClick={inputDecimal}>
            .
          </Button>
          <Button variant="equals" size="calculator" onClick={handleEquals}>
            =
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
