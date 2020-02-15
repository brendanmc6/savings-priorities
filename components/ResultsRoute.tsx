import React, { FC } from "react";
import PriorityItem from "./PriorityItem";
import en from "../lib/en";
import { priorities } from "../lib/generateResults";
import { Button } from "semantic-ui-react";

interface Props {
  validInputs: Inputs;
  handleEditMode: () => void;
  results: Results;
}

const ResultsRoute: FC<Props> = ({ validInputs, handleEditMode, results }) => {
  console.log("results are", results);
  return (
    <div>
      inputs:
      <p>{JSON.stringify(validInputs)}</p>
      results:
      {priorities.map(id => {
        return <PriorityItem text={en[id].title} {...results[id]} />;
      })}
      <Button onClick={handleEditMode}>EDIT INPUTS</Button>
    </div>
  );
};

export default ResultsRoute;
