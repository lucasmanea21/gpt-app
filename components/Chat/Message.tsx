import { useAtom } from "jotai";
import Image from "next/image";
import React from "react";
import { userSessionAtom } from "../../store/atom";
import Chat from "../Cards/ChatCard";

const Message = ({ text }: { text: string }) => {
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
        <p className="text-sm">{text}</p>
      </div>
    </Chat>
  );
};

export default Message;
