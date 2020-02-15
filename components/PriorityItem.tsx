import React, { FC } from "react";
import {
  CheckCircleRounded,
  StarHalfRounded,
  CheckCircleOutlineRounded
} from "@material-ui/icons";

interface Props {
  text: string;
  targetValue: number;
  monthly: boolean;
  complete: boolean;
  isFirstPriority: boolean;
}

const PriorityItem: FC<Props> = ({
  text,
  targetValue,
  monthly,
  complete,
  isFirstPriority
}) => {
  const hasData = targetValue !== undefined;

  return (
    <div>
      {isFirstPriority ? (
        <StarHalfRounded />
      ) : complete ? (
        <CheckCircleRounded />
      ) : (
        <CheckCircleOutlineRounded />
      )}
      <p>{text}</p>
      {hasData && <p>{`$${targetValue}${monthly ? "/mo" : ""}`}</p>}
      <style jsx>{`
        div {
          display: flex;
          justify-content: space-between;
        }
        p:nth-of-type(2) {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default PriorityItem;
