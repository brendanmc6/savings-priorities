import React, { FC } from "react";
import PriorityItem from "./PriorityItem";
import { priorities } from "../lib/generateResults";
import { Button } from "semantic-ui-react";
import { getFirstPriorityStrings } from "../lib/getStrings";

interface Props {
  validInputs: Inputs;
  handleEditMode: () => void;
  results: Results;
}

const ResultsRoute: FC<Props> = ({ handleEditMode, results }) => {
  const { firstPriority } = results;
  const strings = getFirstPriorityStrings(firstPriority);
  return (
    <div>
      <h1>Savings Priorities</h1>
      <Button style={{ margin: 8 }} onClick={handleEditMode}>
        EDIT INPUTS
      </Button>
      <div className="firstPriority">
        <h5>Your current priority:</h5>
        <h3>{strings[firstPriority.id].title}</h3>
        <p>{strings[firstPriority.id].motivation}</p>
      </div>
      <div style={{ margin: 16 }}>
        <h5>
          💸 A green checkmark means you've completed that step, or you can
          afford to pay it off.
        </h5>

        {priorities.map(id => {
          return (
            <PriorityItem
              text={strings[id].title}
              {...results[id]}
              firstPriority={results.firstPriority}
              key={id}
            />
          );
        })}
      </div>
      <style jsx>
        {`
          .firstPriority {
            border: 1px solid black;
            border-radius: 16px;
            padding: 16px;
          }
          h3 {
            margin-top: 0px;
          }
        `}
      </style>
    </div>
  );
};

export default ResultsRoute;
