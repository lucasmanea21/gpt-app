import { supabase } from "./supabase-client";

export const fetchResponseCount = async ({
  quizId,
  step,
  setResponseCount,
}: {
  quizId: string;
  step: number;
  setResponseCount: any;
}) => {
  console.log("quizId,step", quizId, step);
  const { data: responses, error } = await supabase
    .from("responses")
    .select("id", { count: "exact" })
    .eq("quiz_id", quizId)
    .eq("step", step);

  if (error) {
    console.error("Error fetching response count:", error);
  } else {
    setResponseCount(responses.length);
  }
};
