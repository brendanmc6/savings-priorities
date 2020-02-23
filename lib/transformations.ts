// each transformation takes the initial inputs
// and the results of the previous input
// and calculates a new result

interface Params {
  targetValue: number;
  remainingIncome: number;
  remainingSavings: number;
  complete: boolean;
  monthly: boolean;
}

type Data = { [key in Priority]: (i: Inputs, prev: Results) => Params };

export const HIGH_INTEREST = 10; // percent
export const LOW_INTEREST = 3;

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
      complete: !targetValue || remainingIncome >= 0,
      monthly: true
    };
  },
  highInterestDebt(i, prev) {
    const targetValue = i.debts.reduce((acc, val) => {
      return val.rate >= HIGH_INTEREST ? acc + val.principal : acc;
    }, 0);
    const remainingSavings = prev.remainingSavings - targetValue;
    const complete = !targetValue || remainingSavings >= 0;
    const remainingIncome = prev.remainingIncome;
    return {
      targetValue,
      remainingIncome,
      remainingSavings,
      complete,
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
      complete: !targetValue || remainingSavings >= 0,
      monthly: false
    };
  },
  largePurchases(i, prev) {
    return {
      targetValue: 0,
      remainingIncome: prev.remainingIncome,
      remainingSavings: prev.remainingSavings,
      complete: false,
      monthly: false
    };
  }
};

export default transformations;
