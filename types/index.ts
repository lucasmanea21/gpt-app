export interface Quiz {
  id?: string;
  questions: Question[];
  subject: string;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
}

export interface Question {
  question: string;
  options: string[];
  answer: "a" | "b" | "c" | "d";
  quiz_id?: string;
}

export interface Answer {
  id?: string;
  answer: string;
  is_correct: boolean;
  created_at?: string;
  updated_at?: string;
  question_id?: string;
}

export interface LeaderboardUser {
  name: string;
  points: number;
  id: string;
  avatar_url: string;
  rank: number;
}
