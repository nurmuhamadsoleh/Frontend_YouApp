import { BaseButtonProps } from "antd/lib/button/button";
import { InfoCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";

interface IProps {
  cancelText: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  okText: string;
  onCancel?: () => void;
  onOk?: () => void;
  title: React.ReactNode;
  okButtonProps?: BaseButtonProps;
}

export default function ModalConfirm(props: IProps) {
  const {
    title,
    content,
    cancelText,
    okText,
    onCancel,
    onOk,
    icon,
    okButtonProps,
  } = props;
  return Modal.confirm({
    title: (
      <>
        <div className="m-auto">
          {icon ? (
            icon
          ) : (
            <InfoCircleFilled className="text-[#f6c715] text-3xl mb-2" />
          )}
        </div>
        {title}
      </>
    ),
    className: "cModalConfirm",
    content,
    icon: undefined,
    okButtonProps: okButtonProps
      ? okButtonProps
      : { type: "primary", size: "large" },
    cancelButtonProps: {
      size: "large",
      type: "text",
      className: "hover:!bg-white hover:opacity-80",
    },
    cancelText: <span className="capitalize text-red-600">{cancelText}</span>,
    okText: <span className="capitalize">{okText}</span>,
    onCancel,
    onOk,
  });
}
