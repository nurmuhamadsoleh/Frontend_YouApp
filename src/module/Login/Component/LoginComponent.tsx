import { Button, Form as FormANTD } from "antd";
import { Field, Form } from "react-final-form";

import { ILoginDTO } from "../DTO/login.dto";
import Image from "next/image";
import Input from "component/Input";
import LoginValidation from "../Validation/LoginValidation";
import Logo from "../../../assets/images/loginLogo.png";
import React from "react";
import Select from "component/Select";

interface IProps {
  handleSubmit: (_val: ILoginDTO) => void;
  isLoading: boolean;
}

export default function LoginComponent(props: IProps) {
  const { handleSubmit, isLoading } = props;
  return (
    <>
      <div className="relative">
        <div className="absolute z-5  w-full h-[600px]">
          <Image src={Logo} className="w-full h-[250px]" alt="" />
        </div>

        <main className="h-screen overflow-hidden">
          <div className="justify-center flex mt-[45vh]">
            <Form onSubmit={handleSubmit} validate={LoginValidation}>
              {(formProps) => {
                const { handleSubmit, invalid, dirty } = formProps;

                return (
                  <FormANTD layout="vertical" onFinish={handleSubmit}>
                    <div className="flex gap-2 w-full">
                      <div className="w-full">
                        <Field
                          name="companyId"
                          component={Input}
                          label="ID Salon"
                          isFormItem
                          placeholder="Masukan ID Salon Anda"
                          showError={dirty}
                        />
                      </div>

                      <div className="w-2/5 hidden">
                        <Field
                          name="IO_LOKASI_GUDANG_ID"
                          component={Select}
                          label="Shift"
                          isFormItem
                          allowClear
                          showError={dirty}
                          optionData={[
                            {
                              label: "PAGI",
                              value: "PAGI",
                            },
                            {
                              label: "SIANG",
                              value: "SIANG",
                            },
                          ]}
                          filterOption={false}
                        />
                      </div>
                    </div>
                    <Field
                      name="username"
                      component={Input}
                      label="Username / Email"
                      isFormItem
                      placeholder="Masukan Username Anda"
                      className="w-80"
                      showError={dirty}
                    />
                    <Field
                      name="password"
                      component={Input}
                      label="Password"
                      isFormItem
                      className="w-80"
                      placeholder="Masukan Password Anda"
                      showError={dirty}
                      isPassword
                    />
                    <div className="flex justify-center pt-6">
                      <Button
                        className="bg-pinkBrand text-white"
                        htmlType="submit"
                        disabled={invalid}
                        loading={isLoading}
                      >
                        Login
                      </Button>
                    </div>
                  </FormANTD>
                );
              }}
            </Form>
          </div>
        </main>
      </div>
    </>
  );
}
