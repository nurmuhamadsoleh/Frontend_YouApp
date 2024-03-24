import { Form, Radio, Space } from "antd";

import { ChangeEvent } from "react";
import { RadioButtonProps } from "antd/lib/radio/radioButton";
import handleFeedBack from "helper/handleFeedback";

interface IRadioButton extends RadioButtonProps {
  colon?: boolean;
  disabled?: boolean;
  input: any;
  inputRef?: any;
  isFormItem?: boolean;
  label?: string;
  direction?: "horizontal" | "vertical";
  meta: { error: string; touched: boolean };
  onSearch?: (_vals: string) => void;
  onChange?: (_vals: any) => void;
  showError?: boolean;
  optionData: {
    value: any;
    label: string;
  }[];
}

export default function RadioButton(props: IRadioButton) {
  const {
    colon,
    className,
    disabled,
    input,
    isFormItem,
    label,
    meta: { error },
    showError,
    onChange,
    onSearch,
    optionData,
    direction = "horizontal",
  } = props;

  const combinedProps = {
    className,
    disabled,
    ...input,
    ...props,
    onSearch,
  };

  delete combinedProps.isFormItem;
  delete combinedProps.showError;
  if (onChange) {
    const handleOnChange = (vals: ChangeEvent<HTMLInputElement>) => {
      input.onChange(vals);
      onChange(vals);
    };
    combinedProps.onChange = handleOnChange;
  }

  function RenderInput() {
    return (
      <Radio.Group className="mb-6" {...combinedProps}>
        <Space direction={direction}>
          {optionData.map((v, i) => {
            return (
              <Radio value={v.value} key={`radio-${i}`}>
                <span className="first-letter:capitalize block">{v.label}</span>
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    );
  }

  if (isFormItem) {
    return (
      <Form.Item
        label={label && <b className="font-poppinsSemiBold">{label}</b>}
        colon={colon || false}
        validateStatus={handleFeedBack(error, "error", showError)}
        help={handleFeedBack(error, error, showError)}
      >
        {RenderInput()}
      </Form.Item>
    );
  }
  return RenderInput();
}
