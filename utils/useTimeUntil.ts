import parseMs from "parse-ms";
import useCountDown from "react-use-countdown";

const useTimeUntil = (timeUntil: number) => {
  const timeLeft = useCountDown(() => timeUntil);

  return { ...parseMs(timeLeft), timeLeft };
};

export default useTimeUntil;
