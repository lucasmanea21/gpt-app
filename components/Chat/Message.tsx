import { useAtom } from "jotai";
import Image from "next/image";
import React from "react";
import { userSessionAtom } from "../../store/atom";
import Chat from "../Cards/ChatCard";

const Message = () => {
  const [session] = useAtom(userSessionAtom);

  return (
    <Chat bgColor="bg-gray-900">
      <div className="w-[60px]">
        <Image
          src={session?.user?.user_metadata.picture}
          width={50}
          height={50}
          alt="pfp"
        />
      </div>

      <div className="w-full">
        <p className="text-sm">
          Dolor nisi aliquip qui ex consectetur laborum nisi do commodo.
          Consectetur et in quis magna ipsum culpa amet fugiat pariatur sit
          laboris?
        </p>
      </div>
    </Chat>
  );
};

export default Message;
