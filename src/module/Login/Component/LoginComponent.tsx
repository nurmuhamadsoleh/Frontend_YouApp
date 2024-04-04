import { Button, Form as FromANTD } from "antd";
import { Field, Form } from "react-final-form";

import Input from "component/Input";
import Link from "next/link";
import React from "react";

interface IProps {
  handleSubmit: (vals: any) => void;
}
function LoginComponent(props: IProps) {
  const { handleSubmit } = props;
  return (
    <main className="bg-drankblue h-screen overflow-hidden">
      <Button className="my-4 mx-4">Kembali</Button>
      <h1 className="text-white font-medium text-center">Login</h1>
      <div className="flex justify-center items-center m-4">
        <Form onSubmit={handleSubmit}>
          {(formProps: any) => {
            const { handleSubmit, invalid, dirty } = formProps;
            return (
              <div className="">
                <FromANTD layout="vertical" onFinish={handleSubmit}>
                  <Field
                    name="username"
                    component={Input}
                    placeholder="Enter Username/Email"
                    isFormItem
                    className="w-80 placeholder-white bg-yellow-600 text-white  font-bold bg-[rgba(9,20,26,0.06)]"
                    showError={dirty}
                  />
                  <Field
                    name="password"
                    component={Input}
                    placeholder="Enter Password"
                    isFormItem
                    isPassword
                    className="w-80 placeholder-white bg-yellow-600 text-white  font-bold bg-[rgba(9,20,26,0.06)]"
                    showError={dirty}
                  />
                  <Button
                    className="bg-lightblue text-white font-bold w-full active:drop-shadow-2xl focus:text-white"
                    htmlType="submit"
                  >
                    Login
                  </Button>
                  <div className="mt-4 text-center">
                    <span className="text-sm text-white">
                      No account ?{" "}
                      <Link
                        href="/register"
                        className="text-[#94783E] font-medium"
                      >
                        Register Here
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

export default LoginComponent;
