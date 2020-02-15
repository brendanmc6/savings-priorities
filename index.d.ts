interface Debt {
  principal: number;
  minimum: number;
  rate: number;
}

interface Inputs {
  income: number;
  savings: number;
  employerMatch: number;
  expensesEssential: number;
  debts: Debt[];
}

type Priority =
  | "expensesEssential"
  | "minimumDebtPayments"
  | "smallEmergencyFund"
  | "employerMatch"
  | "highInterestDebt"
  | "largeEmergencyFund"
  | "moderateInterestDebt";

interface PriorityObject {
  complete: boolean;
  targetValue: number;
  monthly: boolean;
  isFirstPriority: boolean;
}

type WithAllObjects = {
  [key in Priority]: PriorityObject;
};

type ExtraData = {
  remainingIncome: number;
  remainingSavings: number;
  firstPriority?: {
    id: Priority;
    currentValue: number;
    targetValue: number;
  };
};

type Results = WithAllObjects & ExtraData;

type Route = "HOME" | "RESULTS";
