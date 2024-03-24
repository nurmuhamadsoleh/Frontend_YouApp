import { Form, Select as SelectAntd, Space, Spin } from "antd";

import { ChangeEvent } from "react";
import { OptionProps } from "antd/lib/select";
import React from "react";
import handleFeedBack from "helper/handleFeedback";

interface IInput {
  className?: string;
  disabled?: boolean;
  input: any;
  inputRef?: any;
  isFormItem?: boolean;
  label?: string;
  meta: { error: string };
  mode?: string;
  // onSelect?: any;
  optionData: OptionProps[];
  placeholder?: string;
  showError?: boolean;
  filterOption?: any;
  loading?: boolean;
  optionFilterProp?: string;
  showSearch?: boolean;
  allowClear?: boolean;
  defaultValue?: any;
  defaultActiveFirstOption?: boolean;
  onSearch?: (_val: string) => void;
  onChange?: (_vals: any) => void;
  onSelect?: (_string: any) => void;
}

export default function Select(props: IInput) {
  const {
    className,
    disabled,
    input,
    inputRef,
    isFormItem,
    label,
    meta: { error },
    mode,
    optionData,
    placeholder,
    showError,
    filterOption,
    defaultValue,
    loading,
    showSearch,
    allowClear,
    optionFilterProp,
    defaultActiveFirstOption,
    onSelect,
    onSearch,
    onChange,
  } = props;

  const options =
    placeholder && mode !== "multiple"
      ? [{ value: "", label: placeholder }, ...optionData]
      : optionData;

  const combinedProps = {
    className,
    disabled,
    ...input,
    mode,
    value: mode && !input.value ? undefined : input.value,
    options,
    placeholder,
    onSelect,
    filterOption,
    loading,
    allowClear,
    defaultValue,
    optionFilterProp,
    showSearch,
    defaultActiveFirstOption,
    onSearch,
  };
  if (onChange) {
    const handleOnChange = (vals: ChangeEvent<HTMLInputElement>) => {
      input.onChange(vals);
      onChange(vals);
    };
    combinedProps.onChange = handleOnChange;
  }

  function RenderInput() {
    return (
      <SelectAntd
        ref={inputRef}
        {...combinedProps}
        onSelect={onSelect}
        placeholder={placeholder}
        allowClear={allowClear}
        optionFilterProp={optionFilterProp}
        popupMatchSelectWidth={false}
        notFoundContent={
          loading ? (
            "Data tidak ditemukan"
          ) : (
            <Space
              className="py-10"
              direction="vertical"
              style={{ width: "100%" }}
            >
              <Spin tip="Loading">
                <div className="content" />
              </Spin>
            </Space>
          )
        }
      />
    );
  }

  if (isFormItem) {
    return (
      <Form.Item
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
