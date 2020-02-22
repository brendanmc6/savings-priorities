import transformations from "./transformations";

type GenerateResults = (i: Inputs) => Results;

// in order
export const priorities: Priority[] = [
  "expensesEssential",
  "minimumDebtPayments",
  "smallEmergencyFund",
  "highInterestDebt",
  "employerMatch",
  "largeEmergencyFund",
  "moderateInterestDebt"
];

export const generateResults: GenerateResults = inputs => {
  const init = {
    remainingIncome: inputs.income,
    remainingSavings: inputs.savings
  } as Results;

  const results = priorities.reduce((prev, id) => {
    const calculate = transformations[id];
    const {
      remainingIncome,
      remainingSavings,
      targetValue,
      complete,
      monthly
    } = calculate(inputs, prev);
    const isFirstPriority = !complete && !prev.firstPriority;
    const obj: PriorityObject = {
      // define PriorityObject here for type safety
      targetValue,
      isFirstPriority,
      complete,
      monthly
    };
    let result: Results = {
      ...prev,
      remainingIncome,
      remainingSavings,
      [id]: obj
    };
    if (isFirstPriority) {
      result.firstPriority = {
        id,
        targetValue,
        currentValue: monthly
          ? targetValue + remainingIncome
          : targetValue + remainingSavings
      };
    }
    console.log(`${id}`, result);

    return result;
  }, init);

  console.log("results", results);
  return results;
};

export default generateResults;
