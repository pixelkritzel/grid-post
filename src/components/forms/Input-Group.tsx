import * as React from 'react';

export interface FunctionalComponent {
  (): JSX.Element;
}

export interface OnChangeCallback {
  (event: React.ChangeEvent<HTMLInputElement>): void;
}

type InputGroupPropsType = {
  identifier: string;
  labelHtml: string | FunctionalComponent;
  inputType: string;
  inputValue: string;
  onChange: OnChangeCallback;
};

const InputGroup = ({ identifier, labelHtml, inputType, inputValue, onChange }: InputGroupPropsType) => {
  return (
    <div>
      <label htmlFor={identifier} className="mr-sm-2">
        {labelHtml}
      </label>

      <input
        type={inputType}
        className="formControl mr-sm-2"
        id={identifier}
        defaultValue={inputValue}
        onChange={onChange}
      />
    </div>
  );
};

export default InputGroup;
