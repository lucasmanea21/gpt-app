import { useAtom } from "jotai";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { userInfoAtom, userSessionAtom } from "../../store/atom";
import Button from "../Button";
import { BsFillLightbulbFill } from "react-icons/bs";

const Navigation = () => {
  const Item = ({ name, link, icon }: any) => {
    return (
      <div className="flex items-center justify-center">
        {icon}
        <a href={link}>{name}</a>
      </div>
    );
  };
  const tabs = [
    { name: "Home", icon: <BsFillLightbulbFill /> },
    { name: "About", icon: <BsFillLightbulbFill /> },
    { name: "Contact", icon: <BsFillLightbulbFill /> },
  ];

  return (
    <div className="bg-gray-700 p-10 rounded-lg space-y-3 w-2/3 justify-start items-center flex flex-col">
      {tabs.map((tab, i) => {
        return <Item key={i} name={tab?.name} link={"/"} icon={tab?.icon} />;
      })}
    </div>
  );
};

const Profile = () => {
  const [session] = useAtom(userSessionAtom);
  const [userInfo] = useAtom(userInfoAtom);

  console.log("session", session);

  return (
    <div className="bg-gray-600 p-3 rounded-lg w-full flex items-center justify-between">
      {session && (
        <>
          <div className="flex justify-between items-center w-full space-x-3">
            <div className="w-1/3">
              <Image
                src={session?.user?.user_metadata.picture}
                width={50}
                height={50}
                alt="pfp"
              />
            </div>

            <div className="w-2/3">
              {/* <p>{userInfo?.email} </p> */}
              <div className="mt-1 mb-4">
                <p className="text-lg">{userInfo?.full_name} </p>
                <p className="text-xs">252 puncte | 14 quizuri</p>
              </div>
              <Button
                link="/profile"
                customClassName="filled flex w-full justify-center"
              >
                Vezi profil
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Navbar = () => {
  const [width, setWidth] = useState(0);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <nav className="sidebar">
      <Navigation />
      <Profile />
    </nav>
  );
};

export default Navbar;
