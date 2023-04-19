import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { supabase } from "../pages/api/supabase/supabase-client";
import { userInfoAtom, userSessionAtom } from "../store/atom";

const useGetUserData = () => {
  const [session, setSession] = useAtom(userSessionAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);

  useEffect(() => {
    getSession();
  }, []);

  useEffect(() => {
    session && getUserInfo();
  }, [session]);

  const getUserInfo = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session?.user?.id);

    data && data[0] && setUserInfo(data[0]);
  };

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    setSession(data.session);
  };

  return { session, userInfo };
};

export default useGetUserData;
