import { atom } from "jotai";

export const userInfoAtom = atom<any>({});
export const userSessionAtom = atom<any>({});
export const questionsIndexAtom = atom<number>(0);
export const chatLogAtom = atom<any[]>([
  //   { type: "question", text: "hi!" },
  //   { type: "answer", text: "Hello there!" },
]);
export const conversationIdAtom = atom("");
export const parentMessageIdAtom = atom("");
export const quizSubjectAtom = atom("");
export const isQuizLoadingAtom = atom(false);

export const questionsAtom = atom<any>([]);
export const answersAtom = atom<any>([]);

export const liveReplyAtom = atom("");

export const timeStartedAtom = atom(0);
export const timeFinishedAtom = atom(0);

export const correctAnswersAtom = atom(0);

export const quizInfoAtom = atom<any>([]);

export const stepAtom = atom(1);
