import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "./api/supabase-client";
import Navbar from "../components/Navbar";
import SectionWrapper from "../components/Wrappers";
import useGetUserData from "../hooks/useGetUserData";

const AuthPage = () => {
  useGetUserData();

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <SectionWrapper>
          <div className="bg-gray-800 p-8 rounded-lg">
            {/* <p className="text-xl">LearnGPT</p>
          <p className="text-sm text-gray-100">
            Inregistreaza-te si deblocheaza cunostiinte noi.
          </p> */}
            <Auth
              //   @ts-ignore
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={["google", "facebook", "twitter"]}
              theme="dark"
            />
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
};

export default AuthPage;
