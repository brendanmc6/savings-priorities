import React, { FC, ChangeEvent } from "react";
import { Input, Label } from "semantic-ui-react";

interface Props {
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  placeholder?: string;
}

const InputPercentage: FC<Props> = ({ onChange, value, id, placeholder }) => {
  const lintedValue = value === 0 ? "" : value; // so that 0 shows placeholder
  return (
    <>
      <Input
        labelPosition="left"
        type="number"
        placeholder={placeholder || "Amount"}
        style={{ width: "100%", marginBottom: 8, maxWidth: 125 }}
        onChange={onChange}
      >
        <Label basic>%</Label>
        <input id={id} value={lintedValue} />
      </Input>
    </>
  );
};

export default InputPercentage;
