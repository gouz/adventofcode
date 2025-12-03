type Equation = {
  result: number;
  numbers: number[];
};

export const calc = (input: string) => {
  const operations = input
    .split("\n")
    .map((line) => line.replace(":", "").split(" ").map(Number))
    .map((nums) => {
      const result = nums.shift() || 0;
      return {
        result,
        numbers: nums,
      };
    });

  const evaluateExpression = (
    numbers: number[],
    operators: string[],
  ): number => {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
      if (operators[i] === "+") {
        result += numbers[i + 1];
      } else if (operators[i] === "*") {
        result *= numbers[i + 1];
      } else if (operators[i] === "||")
        result = Number(`${result}${numbers[i + 1]}`);
    }
    return result;
  };

  const generateOperatorCombinations = (
    slots: number,
    operators: string[],
  ): string[][] => {
    const results: string[][] = [];

    function backtrack(current: string[]) {
      if (current.length === slots) {
        results.push([...current]);
        return;
      }
      for (const op of operators) {
        current.push(op);
        backtrack(current);
        current.pop();
      }
    }

    backtrack([]);
    return results;
  };

  const calculateCalibration = (
    equations: Equation[],
    operators: string[],
  ): number => {
    let totalSum = 0;

    for (const eq of equations) {
      const { result, numbers } = eq;
      const operatorCombinations = generateOperatorCombinations(
        numbers.length - 1,
        operators,
      );
      let isSolvable = false;

      for (const ops of operatorCombinations) {
        const res = evaluateExpression(numbers, ops);
        if (res === result) {
          isSolvable = true;
          break;
        }
      }

      if (isSolvable) {
        totalSum += result;
      }
    }

    return totalSum;
  };

  return {
    part1: calculateCalibration(operations, ["+", "*"]),
    part2: calculateCalibration(operations, ["+", "*", "||"]),
  };
};
