import { HIGH_INTEREST, LOW_INTEREST } from "./transformations";
import formatCurrency from "./formatCurrency";

interface StringObj {
  title: string;
  motivation: string;
}

type FirstPriorityStrings = {
  [key in Priority]: StringObj;
};

export const getCompletionStrings = (
  remainingIncome: number,
  remainingSavings: number
): StringObj => ({
  title: "Congrats!",
  motivation: `
      You've completed all the major income and savings milestones!
      Now, consider taking the remaining ${remainingSavings} in savings, and ${remainingIncome} in monthly income, and putting it towards long term investments or large (responsible) purchases.
      `
});

export const getFirstPriorityStrings = ({
  targetValue,
  currentValue,
  remainingIncome,
  remainingSavings
}: Results["firstPriority"]): FirstPriorityStrings => {
  const target = formatCurrency(targetValue);
  const current = formatCurrency(currentValue);
  const income = formatCurrency(remainingIncome);
  const savings = formatCurrency(remainingSavings);

  const strings = {
    expensesEssential: {
      title: "Essential Expenses",
      motivation: `
      It looks like your income doesn't cover your essential expenses.
      Right now you should focus on reducing your cost of living and increasing your monthly earnings.
      `
    },
    minimumDebtPayments: {
      title: "Minimum Debt Payments",
      motivation: `
      Your combined minimum debt payments are ${target}, but you only have ${current} of income remaining after expenses.
      Prioritize these payments-- talk to your creditor to see if you can adjust or defer them.
      `
    },
    smallEmergencyFund: {
      title: "Small Emergency Fund",
      motivation: `
      It's important to have a rainy day fund. You currently have saved ${current}. Keep adding to this until you have ${target} (one month's essential living expenses).
      `
    },
    highInterestDebt: {
      title: "High Interest Debt",
      motivation: `
      After setting aside the small emergency fund and making all your minimum payments, you can afford to put the rest towards high-interest debt (${HIGH_INTEREST}% or higher interest rate).
      This includes your remaining ${current} savings, plus ${income} each month.
      At this rate, you could pay it off in ${Math.ceil(
        targetValue / remainingIncome
      )} months. Start with the smallest one first, so you can enjoy one less bill each month!
      `
    },
    employerMatch: {
      title: "Max Matched Retirement Contributions",
      motivation: `
      You aren't saving enough to max out your monthly retirement contribution. See what you can do to make this happen-- it's a very high return on investment over time.
      `
    },
    largeEmergencyFund: {
      title: "Large Emergency Fund",
      motivation: `
      Your goal is to add an additional ${target} to your emergency fund, which is equal to 5 months of living expenses.
      So far you have already saved ${current} towards this goal.
      `
    },
    moderateInterestDebt: {
      title: "Moderate interest debt",
      motivation: `
      Congrats on making it this far!
      Put your remaining ${current} savings, plus ${income} each month towards low interest debt (between ${LOW_INTEREST}% and ${HIGH_INTEREST}%).
      Start with the smallest one first, so you can enjoy one less bill each month! At this rate, you could pay it all off in ${Math.ceil(
        targetValue / remainingIncome
      )} months. 
      `
    },
    largePurchases: {
      title: "Large Purchases & Investments",
      motivation: `
      Congrats on making it this far! You can use your remaining ${savings} in savings and ${income} of income towards important big-ticket items. Make sure to invest in your retirement, and other income-generating purchases first.
      Check out /r/PersonalFinance for more help!`
    }
  };
  return strings;
};
