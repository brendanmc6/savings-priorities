import transformations from "./transformations";

type GenerateResults = (i: Inputs) => Results;

export const priorities: Priority[] = [
  "expensesEssential",
  "minimumDebtPayments",
  "smallEmergencyFund",
  "highInterestDebt",
  "employerMatch",
  "largeEmergencyFund",
  "moderateInterestDebt",
  "largePurchases"
];

/**
 * Iterate over each of the above priorities in order.
 * For each priority, apply the relevant transformation then continue on to the next.
 * Return a large object which has all the info needed for the UI.
 */
export const generateResults: GenerateResults = inputs => {
  const init = {
    remainingIncome: inputs.income,
    remainingSavings: inputs.savings
  } as Results;

  return priorities.reduce((prev, id) => {
    const transform = transformations[id];
    const {
      remainingIncome,
      remainingSavings,
      targetValue,
      complete,
      monthly
    } = transform(inputs, prev);
    // the priority is the first item which has not yet been completed.
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
      remainingIncome, // passed on and used for the next transformation in the list
      remainingSavings,
      [id]: obj
    };
    if (isFirstPriority) {
      /*
      Save the first priority in it's own object, including the income and savings at that point.
      */
      result.firstPriority = {
        id,
        targetValue,
        remainingIncome,
        remainingSavings,
        currentValue: monthly
          ? targetValue + remainingIncome
          : targetValue + remainingSavings
      };
    }
    return result;
  }, init);
};

export default generateResults;
