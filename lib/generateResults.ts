type GenerateResults = (i: Inputs) => Results;

// in order
export const priorities: Priority[] = [
  "expensesEssential",
  "minimumDebtPayments",
  "smallEmergencyFund",
  "employerMatch",
  "highInterestDebt",
  "largeEmergencyFund",
  "moderateInterestDebt"
];

const HIGH_INTEREST = 8; // percent

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
        currentValue: monthly ? remainingIncome : remainingSavings
      };
    }
    console.log(`${id}`, result);

    return result;
  }, init);

  console.log("results", results);
  return results;
};

interface Params {
  targetValue: number;
  remainingIncome: number;
  remainingSavings: number;
  complete: boolean;
  monthly: boolean;
}
type Data = { [key in Priority]: (i: Inputs, prev: Results) => Params };

// each transformation takes the initial inputs
// and the results of the previous input
// and calculates a new result
const transformations: Data = {
  expensesEssential(i, prev) {
    const remainingIncome = i.income - i.expensesEssential;
    return {
      targetValue: i.expensesEssential,
      remainingIncome,
      remainingSavings: prev.remainingSavings,
      complete: remainingIncome >= 0,
      monthly: true
    };
  },
  minimumDebtPayments(i, prev) {
    const targetValue = i.debts.reduce((acc, val) => acc + val.minimum, 0);
    const remainingIncome = prev.remainingIncome - targetValue;
    return {
      targetValue,
      remainingIncome,
      remainingSavings: prev.remainingSavings,
      complete: remainingIncome >= 0,
      monthly: true
    };
  },
  smallEmergencyFund(i, prev) {
    const targetValue = i.expensesEssential; // 1 month expenses
    const remainingSavings = prev.remainingSavings - targetValue;
    return {
      targetValue,
      remainingIncome: prev.remainingIncome,
      remainingSavings,
      complete: remainingSavings >= 0,
      monthly: false
    };
  },
  employerMatch(i, prev) {
    const targetValue = i.employerMatch / 12;
    const remainingIncome = prev.remainingIncome - targetValue;
    return {
      targetValue,
      remainingIncome,
      remainingSavings: prev.remainingSavings,
      complete: remainingIncome >= 0,
      monthly: true
    };
  },
  highInterestDebt(i, prev) {
    const targetValue = i.debts.reduce((acc, val) => {
      return val.rate >= HIGH_INTEREST ? acc + val.principal : acc;
    }, 0);
    const remainingSavings = prev.remainingSavings - targetValue;
    return {
      targetValue,
      remainingIncome: prev.remainingIncome,
      remainingSavings,
      complete: remainingSavings >= 0,
      monthly: false
    };
  },
  largeEmergencyFund(i, prev) {
    const targetValue = i.expensesEssential * 5;
    const remainingSavings = prev.remainingSavings - targetValue;
    return {
      targetValue,
      remainingIncome: prev.remainingIncome,
      remainingSavings,
      complete: remainingSavings >= 0,
      monthly: false
    };
  },
  moderateInterestDebt(i, prev) {
    const targetValue = i.debts.reduce((acc, val) => {
      return val.rate < HIGH_INTEREST ? acc + val.principal : acc;
    }, 0);
    const remainingSavings = prev.remainingSavings - targetValue;
    return {
      targetValue,
      remainingIncome: prev.remainingIncome,
      remainingSavings,
      complete: remainingSavings >= 0,
      monthly: false
    };
  }
};

export default generateResults;
