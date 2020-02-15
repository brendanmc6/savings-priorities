export const expectedInputs: Inputs = {
  savings: 10000,
  income: 1000,
  debts: [{ minimum: 100, principal: 1000, rate: 8.5 }],
  employerMatch: 600,
  expensesEssential: 300
};

export const expectedOutputs: Results = {
  expensesEssential: {
    complete: true,
    isFirstPriority: false,
    monthly: true,
    targetValue: 300
  },
  minimumDebtPayments: {
    complete: true,
    isFirstPriority: false,
    monthly: true,
    targetValue: 100
  },
  smallEmergencyFund: {
    complete: true,
    isFirstPriority: false,
    monthly: true,
    targetValue: 300
  },
  employerMatch: {
    complete: true,
    isFirstPriority: false,
    monthly: true,
    targetValue: 50
  },
  highInterestDebt: {
    complete: true,
    isFirstPriority: true, // here we tell the user that they should pay their debt
    monthly: false,
    targetValue: 1000
  },
  largeEmergencyFund: {
    complete: true,
    isFirstPriority: false,
    monthly: false,
    targetValue: 1500
  },
  moderateInterestDebt: {
    complete: true,
    isFirstPriority: false,
    monthly: false,
    targetValue: 0
  },
  remainingIncome: 550,
  remainingSavings: 5500
};
