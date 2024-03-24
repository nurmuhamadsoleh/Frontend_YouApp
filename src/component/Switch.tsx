import { Form, Switch as SwitchAntd } from "antd";

import React from "react";
import handleFeedBack from "helper/handleFeedback";

interface IInput {
  checkedChildren?: React.ReactNode;
  className?: string;
  colon?: boolean;
  defaultValue?: boolean;
  disabled?: boolean;
  input: any;
  inputRef?: any;
  isFormItem?: boolean;
  label?: string;
  meta: { error: string };
  onChange: any;
  showError?: boolean;
  unCheckedChildren?: React.ReactNode;
  defaultChecked?: boolean;
  loading?: boolean;
}

export default function Switch(props: IInput) {
  const {
    colon,
    className,
    disabled,
    input,
    inputRef,
    isFormItem,
    label,
    meta: { error },
    showError,
    checkedChildren,
    unCheckedChildren,
    onChange,
    loading,
    defaultValue,
    defaultChecked,
  } = props;

  const combinedProps = {
    className,
    disabled,
    checkedChildren,
    unCheckedChildren,
    defaultChecked,
    loading,
    ...input,
    checked: input.value,
    defaultValue,
  };
  if (onChange) {
    combinedProps.onChange = (vals: boolean) => {
      onChange(vals);
      input.onChange(vals);
    };
  }

  function RenderInput() {
    return <SwitchAntd ref={inputRef} {...combinedProps} />;
  }

  if (isFormItem) {
    return (
      <Form.Item
        colon={colon || false}
        label={label && <b className="font-poppinsSemiBold">{label}</b>}
        validateStatus={handleFeedBack(error, "error", showError)}
        help={handleFeedBack(error, error, showError)}
      >
        {RenderInput()}
      </Form.Item>
    );
  }
  return RenderInput();
}
