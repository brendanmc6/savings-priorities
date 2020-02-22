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
}

const CashTotal: FC<CashTotalProps> = ({
  isFirstPriority,
  firstPriority,
  targetValue
}) => {
  if (isFirstPriority) {
    return (
      <p style={{ margin: "0px 8px 0px 0px", textAlign: "end" }}>
        <b>
          {formatCurrency(firstPriority.currentValue)} /{" "}
          {formatCurrency(firstPriority.targetValue)}
        </b>
      </p>
    );
  }
  return (
    <p style={{ margin: "0px 8px 0px 0px", textAlign: "end" }}>
      {formatCurrency(targetValue)}
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
      `}</style>
    </div>
  );
};

export default PriorityItem;
