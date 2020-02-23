import React, { FC } from "react";
import {
  CheckCircleRounded,
  StarHalfRounded,
  CheckCircleOutlineRounded
} from "@material-ui/icons";
import formatCurrency from "../lib/formatCurrency";

interface CashTotalProps {
  firstPriority: Results["firstPriority"];
  isFirstPriority: boolean;
  targetValue: number;
  monthly: boolean;
}

const CashTotal: FC<CashTotalProps> = ({
  isFirstPriority,
  firstPriority,
  targetValue,
  monthly
}) => {
  if (isFirstPriority)
    return (
      <p style={{ margin: "0px 8px 0px 0px", textAlign: "end" }}>
        <b>
          {formatCurrency(firstPriority.currentValue)}
          {firstPriority.targetValue > 0 &&
            " of " + formatCurrency(firstPriority.targetValue)}
        </b>
        {monthly && "/mo"}
      </p>
    );

  if (targetValue === 0)
    return <p style={{ margin: "0px 8px 0px 0px", textAlign: "end" }}>-</p>;

  return (
    <p style={{ margin: "0px 8px 0px 0px", textAlign: "end" }}>
      {formatCurrency(targetValue)}
      {monthly && "/mo"}
    </p>
  );
};

interface Props {
  text: string;
  targetValue: number;
  monthly: boolean;
  complete: boolean;
  isFirstPriority: boolean;
  firstPriority: Results["firstPriority"];
}

const PriorityItem: FC<Props> = ({
  text,
  targetValue,
  monthly,
  firstPriority,
  complete,
  isFirstPriority
}) => {
  const hasData = targetValue !== undefined;
  return (
    <div className="container">
      <p>{text}</p>
      <div className="cashAndIcon">
        {hasData && (
          <CashTotal
            firstPriority={firstPriority}
            isFirstPriority={isFirstPriority}
            targetValue={targetValue}
            monthly={monthly}
          />
        )}
        {isFirstPriority ? (
          <StarHalfRounded style={{ color: "orange" }} />
        ) : complete ? (
          <CheckCircleRounded style={{ color: "teal" }} />
        ) : (
          <CheckCircleOutlineRounded style={{ color: "darkGrey" }} />
        )}
      </div>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .cashAndIcon {
          display: flex;
          align-items: center;
        }
        p {
          margin-bottom: 0px;
        }
      `}</style>
    </div>
  );
};

export default PriorityItem;
