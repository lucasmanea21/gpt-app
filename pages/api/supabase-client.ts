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
  const { data, error } = await supabase.from("quizzes").insert({ ...quiz });

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
