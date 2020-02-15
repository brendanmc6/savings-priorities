type Text = {
  [key in Priority]: {
    title: string;
  };
};

const en: Text = {
  expensesEssential: {
    title: "1. Essential expenses"
  },
  minimumDebtPayments: {
    title: "2. Minimum debt payments"
  },
  smallEmergencyFund: {
    title: "3. Small emergency fund"
  },
  employerMatch: {
    title: "4. Matched contributions"
  },
  highInterestDebt: {
    title: "5. High interest debt"
  },
  largeEmergencyFund: {
    title: "6. Large emergency fund"
  },
  moderateInterestDebt: {
    title: "7. Moderate interest debt"
  }
};

export default en;
