import { useAtom } from "jotai";
import React from "react";
import { userInfoAtom } from "../../store/atom";

const Item = ({ user }: any) => {
  const [userInfo] = useAtom(userInfoAtom);

  return (
    <div className="flex justify-between w-full p-5 my-1 rounded-md cursor-pointer bg-gradient-to-br animate-gradient from-blue-500 to-purple-700 ">
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
