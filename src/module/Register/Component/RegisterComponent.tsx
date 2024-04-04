import { Button, Form as FromANTD } from "antd";
import { Field, Form } from "react-final-form";

import Input from "component/Input";
import Link from "next/link";
import React from "react";

interface IProps {
  handleSubmit: (vals: any) => void;
}
export default function RegisterComponent(props: IProps) {
  const { handleSubmit } = props;
  return (
    <main className="bg-drankblue h-screen overflow-hidden">
      <Button className="my-4 mx-4">Kembali</Button>
      <h1 className="text-white font-medium text-center">Register</h1>
      <div className="flex justify-center items-center m-4">
        <Form onSubmit={handleSubmit}>
          {(formProps: any) => {
            const { handleSubmit, invalid, dirty } = formProps;
            return (
              <div className="">
                <FromANTD layout="vertical" onFinish={handleSubmit}>
                  <Field
                    name="email"
                    component={Input}
                    placeholder="Enter Email"
                    isFormItem
                    className="w-80"
                    showError={dirty}
                  />
                  <Field
                    name="username"
                    component={Input}
                    placeholder="Create Username"
                    isFormItem
                    className="w-80"
                    showError={dirty}
                  />
                  <Field
                    name="username"
                    component={Input}
                    placeholder="Create Password"
                    isFormItem
                    isPassword
                    className="w-80"
                    showError={dirty}
                  />
                  <Field
                    name="username"
                    component={Input}
                    placeholder="Confirm Password"
                    isFormItem
                    isPassword
                    className="w-80"
                    showError={dirty}
                  />
                  <Button
                    className="bg-lightblue text-white font-bold w-full active:drop-shadow-2xl focus:text-white"
                    htmlType="submit"
                  >
                    Register
                  </Button>
                  <div className="mt-4 text-center">
                    <span className="text-sm text-white">
                      Have an account ?
                      <Link href="/" className="text-[#94783E] font-medium">
                        Login Here
                      </Link>
                    </span>
                  </div>
                </FromANTD>
              </div>
            );
          }}
        </Form>
      </div>
    </main>
  );
}
