import React, { FC, useState, ChangeEvent } from "react";
import InputCurrency from "./InputCurrency";
import InputPercentage from "./InputPercentage";
import { Button } from "semantic-ui-react";

type HandleDebtChange = (i: number, n: keyof Debt, v: number) => void;

interface DebtInputProps {
  debt: Debt;
  index: number;
  handleChange: HandleDebtChange;
}
const DebtInput: FC<DebtInputProps> = ({ debt, index, handleChange }) => {
  const getChangeHandler = (name: keyof Debt) => (
    e: ChangeEvent<HTMLInputElement>
  ) => handleChange(index, name, Number(e.target.value));

  return (
    <>
      <h4>Debt {index + 1}</h4>
      <InputCurrency
        onChange={getChangeHandler("principal")}
        value={debt.principal}
        id={`debt${index}_principal`}
        placeholder={"Total amount owed"}
      />
      <InputCurrency
        onChange={getChangeHandler("minimum")}
        value={debt.minimum}
        id={`debt${index}_minimum`}
        placeholder={"Minimum monthly payment"}
      />
      <InputPercentage
        onChange={getChangeHandler("rate")}
        value={debt.rate}
        id={`debt${index}rate`}
        placeholder={"Interest rate"}
      />
    </>
  );
};
interface DebtSectionProps {
  handleChange: (d: Debt[]) => void;
  debts: Debt[];
}
const DebtSection: FC<DebtSectionProps> = ({ handleChange, debts }) => {
  const handleDebtChange: HandleDebtChange = (index, name, value) => {
    const newDebt = { ...debts[index], [name]: value };
    const newDebts = [
      ...debts.slice(0, index),
      newDebt,
      ...debts.slice(index + 1)
    ];
    handleChange(newDebts);
  };
  return (
    <>
      {debts.map((debt, index) => (
        <DebtInput
          debt={debt}
          index={index}
          key={index}
          handleChange={handleDebtChange}
        />
      ))}
    </>
  );
};

interface Props {
  handleSubmit: () => void;
  inputs: Inputs;
  onNewInputs: (i: Inputs) => void;
}

const DataInputForm: FC<Props> = ({ handleSubmit, onNewInputs, inputs }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    onNewInputs({
      ...inputs,
      [e.target.id]: Number(e.target.value)
    });

  const handleDebtChange = (debts: Debt[]) =>
    onNewInputs({
      ...inputs,
      debts
    });
  const submittable = inputs.income > 0 && inputs.expensesEssential > 0;
  return (
    <>
      <h1>Savings Priorities</h1>
      <p>
        This simple savings planner will help you allocate your future paychecks
        in the most effective way. It’s inspired by the popular flowchart from
        /r/PersonalFinances
      </p>
      <p>
        Simply enter your monthly income, expenses and savings to see your
        personalized savings plan!
      </p>
      <form>
        <h3>1. What is your monthly net income?</h3>
        <p>The amount paid into your bank account each month.</p>
        <InputCurrency
          id="income"
          value={inputs.income}
          onChange={handleInputChange}
          isRequired
        />
        <h3>2. How much cash do you have saved up?</h3>
        <InputCurrency
          id="savings"
          value={inputs.savings}
          onChange={handleInputChange}
        />
        <h3>
          3. Retirement benefits: what is the maximum annual contribution your
          employer will match?
        </h3>
        <p>
          This is often calculated as a percentage of your annual income. If
          none, leave blank.
        </p>
        <InputCurrency
          id="employerMatch"
          value={inputs.employerMatch}
          onChange={handleInputChange}
        />
        <h3>4. How much are your essential monthly expenses?</h3>
        <p>
          This includes rent or mortgage, utilities, internet, groceries,
          transport, healthcare and fitness. Exclude any debt payments.
        </p>
        <InputCurrency
          id="expensesEssential"
          value={inputs.expensesEssential}
          onChange={handleInputChange}
          isRequired
        />
        <h3>5. Outstanding debts.</h3>
        <p>
          For each of the outstanding debts you have, add their total amount,
          minimum required payment, and their interest rates.
        </p>
        <h6>Amount - minimum required payment - annual interest rate</h6>
        <DebtSection handleChange={handleDebtChange} debts={inputs.debts} />
        <div className="buttonContainer">
          <Button
            style={{ marginTop: 16 }}
            className="submitButton"
            disabled={!submittable}
            onClick={() => handleSubmit()}
          >
            calculate
          </Button>
        </div>
      </form>
      <style jsx>{`
        .buttonContainer {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </>
  );
};

export default DataInputForm;
