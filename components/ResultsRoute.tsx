import React, { FC } from "react";
import PriorityItem from "./PriorityItem";
import { priorities } from "../lib/generateResults";
import { Button } from "semantic-ui-react";
import getStrings from "../lib/currentPriority";

interface Props {
  validInputs: Inputs;
  handleEditMode: () => void;
  results: Results;
}

const ResultsRoute: FC<Props> = ({ handleEditMode, results }) => {
  const strings = getStrings(results);
  const currentPriority = strings[results.firstPriority.id];
  return (
    <div>
      <Button style={{ margin: 8 }} onClick={handleEditMode}>
        EDIT INPUTS
      </Button>
      <div className="firstPriority">
        <h5>Your current priority:</h5>
        <h3>{currentPriority.title}</h3>
        <p>{currentPriority.motivation}</p>
      </div>

      <div style={{ margin: 16 }}>
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
