import React, { useState, useEffect } from "react";
import { supabase } from "../pages/api/supabase-client";

const useGetQuizInfo = (id: string) => {
  const [quizInfo, setQuizInfo] = useState<any>([]);

  useEffect(() => {
    id && getData();
  }, [id]);

  const getData = async () => {
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", id);

    data && setQuizInfo(data[0]);
  };
  return { quizInfo };
};

export default useGetQuizInfo;
