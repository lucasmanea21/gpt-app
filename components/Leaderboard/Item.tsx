import { useAtom } from "jotai";
import React from "react";
import { userInfoAtom } from "../../store/atom";

const Item = ({ user }: any) => {
  const [userInfo] = useAtom(userInfoAtom);

  let background =
    user.rank == 1
      ? "bg-gradient-to-br animate-gradient from-yellow-600 to-slate-500 font-semibold"
      : user.rank == 2
      ? "bg-gradient-to-br animate-gradient from-gray-300 to-slate-700 font-semibold"
      : user.rank == 3
      ? "bg-gradient-to-br animate-gradient from-amber-600 to-slate-700 font-semibold"
      : "bg-slate-700";

  return (
    <div
      className={`flex justify-between w-full p-5 my-1 rounded-md cursor-pointer ${background} `}
    >
      <div className="flex space-x-2">
        <p>{user.rank}.</p>
        <p>
          {user.name} {userInfo.id == user.id && "(tu)"}
        </p>
      </div>
      <p>{user.points} puncte</p>
    </div>
  );
};

export default Item;
