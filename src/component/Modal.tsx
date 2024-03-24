import { Modal as ModalAntd } from "antd";
import React from "react";

interface IModal {
  centered?: boolean;
  children: React.ReactNode;
  className?: string;
  classNameDiv?: string;
  width?: number;
  confirmLoading?: boolean;
  closeIcon?: boolean;
  footer?: React.ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
  open: boolean;
  title?: string | React.ReactNode;
  bodyStyle?: React.CSSProperties;
}

export default function Modal(props: IModal) {
  const {
    footer,
    open,
    onOk,
    closeIcon,
    confirmLoading,
    className,
    classNameDiv,
    children,
    title,
    onCancel,
    centered,
    width,
    bodyStyle,
  } = props;
  return (
    <ModalAntd
      onOk={onOk}
      centered={centered}
      closeIcon={closeIcon}
      confirmLoading={confirmLoading}
      width={width}
      className={`${className} !top-11`}
      footer={footer}
      maskClosable={false}
      onCancel={onCancel}
      open={open}
      title={<span className="text-left block">{title}</span>}
      bodyStyle={bodyStyle}
    >
      <div
        className={`max-h-[70vh] overflow-y-auto overflow-x-hidden ${classNameDiv}`}
      >
        {children}
      </div>
    </ModalAntd>
  );
}
