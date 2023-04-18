import { createClient } from "@supabase/supabase-js";
import { Quiz } from "../../types";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export const updatePoints = async (id: string, points: number) => {
  const { data, error } = await supabase
    .from("users")
    .update({ points })
    .match({ id });

  return { data, error };
};

export const createQuiz = async (quiz: Quiz) => {
  console.log("createQuiz prop", quiz);
  const { data, error } = await supabase
    .from("quizzes")
    .insert({ questions: quiz })
    .select();

  // add 1 to user's quizzes
  // const { data: userData, error: userError } = await supabase
  //   .from("users")
  //   .update({ quizzes: supabase.raw("quizzes + 1") })
  //   .match({ id: id });

  return { data, error };
};

export const getQuiz = async (id: string) => {
  const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("id", id);

  return { data, error };
};

export const getUsersByPoints = async () => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("points", { ascending: false });

  return { data, error };
};

export const fetchResponseCount = async ({
  quizId,
  step,
}: {
  quizId: string;
  step: number;
}) => {
  const { data: responses, error } = await supabase
    .from("responses")
    .select("id", { count: "exact" })
    .eq("quiz_id", quizId)
    .eq("step", step);

  if (error) {
    console.error("Error fetching response count:", error);
  } else {
    return responses.length;
  }
};
