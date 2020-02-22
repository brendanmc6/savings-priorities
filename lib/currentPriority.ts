import { HIGH_INTEREST, LOW_INTEREST } from "./transformations";
import formatCurrency from "./formatCurrency";

type Properties = Priority & "completion";

type Text = {
  [key in Properties]: {
    title: string;
    motivation: string;
  };
};

const getStrings = (r: Results): Text => {
  const remainingIncome = formatCurrency(r.remainingIncome);
  const remainingSavings = formatCurrency(r.remainingSavings);
  const currentValue = formatCurrency(r.firstPriority.currentValue);
  const targetValue = formatCurrency(r.firstPriority.targetValue);

  return {
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
      Your combined minimum debt payments are ${targetValue}, but you only have ${remainingIncome} of income remaining after expenses.
      Prioritize these payments-- talk to your creditor to see if you can adjust or defer them.
      `
    },
    smallEmergencyFund: {
      title: "Small Emergency Fund",
      motivation: `
      It's important to have a rainy day fund. You currently have saved %REMAINING_SAVINGS. Keep adding to this until you have %TARGET_VALUE (one month's essential living expenses).
      `
    },
    highInterestDebt: {
      title: "High Interest Debt",
      motivation: `
      After setting aside the small emergency fund and making all your minimum payments, you can afford to put the rest towards high-interest debt (${HIGH_INTEREST}% or higher interest rate).
      This includes your remaining ${currentValue} savings, plus ${remainingIncome} each month.
      At this rate, you could pay it off in TARGET-SAVINGS/REMAINING_INCOME months. Start with the smallest one first, so you can enjoy one less bill each month!
      `
    },
    employerMatch: {
      title: "Max Matched Contributions",
      motivation: `
      You aren't saving enough to max out your monthly retirement contribution. Consider putting some of your remaining %REMAINING_INCOME each month towards this-- it's a very high return on investment over time.
      `
    },
    largeEmergencyFund: {
      title: "Large Emergency Fund",
      motivation: `
      Your goal is to add an additional ${targetValue} to your emergency fund, which is equal to 5 months of living expenses.
      So far you have already saved ${currentValue} towards this goal.
      `
    },
    moderateInterestDebt: {
      title: "Moderate interest debt",
      motivation: `
      Congrats on making it this far! Put your remaining %REMAINING_INCOME of income and %REMAINING_SAVINGS of savings towards paying off your moderate interest debts (between ${LOW_INTEREST}% and ${HIGH_INTEREST}%)
      `
    },
    completion: {
      title: "Congrats!",
      motivation: `
      You've completed all the major income and savings milestones!
      Now, consider taking the remaining %REMAIING_SAVINGS in savings, and %REMAINING_INCOME in monthly income, and putting it towards long term investments or large (responsible) purchases.
      `
    }
  };
};

export default getStrings;
