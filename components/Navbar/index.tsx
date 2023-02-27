import { useAtom } from "jotai";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { userInfoAtom, userSessionAtom } from "../../store/atom";
import Button from "../Button";
import { BsFillLightbulbFill, BsTrophyFill } from "react-icons/bs";
import { MdQuiz } from "react-icons/md";
import { supabase } from "../../pages/api/supabase-client";
import Card from "../Cards";
import { BsStars } from "react-icons/bs";

const Navigation = () => {
  const Item = ({ name, link, icon }: any) => {
    return (
      <div className="flex items-center w-full p-2 space-x-3 rounded-md hover:bg-slate-600">
        {icon}
        <a href={link}>
          <p className="text-lg">{name} </p>
        </a>
      </div>
    );
  };
  const tabs = [
    { name: "Home", icon: <BsFillLightbulbFill size={20} />, link: "/" },
    { name: "Quiz", icon: <MdQuiz size={20} />, link: "/quiz/4" },
    {
      name: "Leaderboard",
      icon: <BsTrophyFill size={20} />,
      link: "/clasament",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full p-5 space-y-3 rounded-lg">
      {tabs.map((tab, i) => {
        return (
          <Item key={i} name={tab?.name} link={tab?.link} icon={tab?.icon} />
        );
      })}
    </div>
  );
};

const ProfileStats = () => {
  const [userInfo] = useAtom(userInfoAtom);

  return (
    <div className="absolute top-[-50px] z-0 w-full justify-between space-x-2 flex p-5 pt-4 pb-10 bg-gray-900 rounded-lg">
      <div className="flex items-center justify-center space-x-1">
        <BsStars size={16} />
        <p className="text-sm font-medium text-gray-200">
          {userInfo.points ?? 0} puncte
        </p>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <BsStars size={16} />
        <p className="text-sm font-medium text-gray-200">
          {userInfo.points ?? 0} quizuri
        </p>
      </div>
    </div>
  );
};

const Profile = () => {
  const [session] = useAtom(userSessionAtom);
  const [userInfo] = useAtom(userInfoAtom);

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  console.log("userInfo", userInfo);

  console.log("session", session);

  return (
    <div className="z-10 flex items-center justify-between w-full p-5 py-2 bg-gray-600 rounded-3xl">
      {session ? (
        <>
          <div className="flex items-center justify-between w-full space-x-3">
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
              <div className="mt-1 mb-2">
                <p className="text-lg">{userInfo?.full_name} </p>
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
      ) : (
        <button onClick={() => handleLogin()}>Log in with Google</button>
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
      <p className="text-2xl">LearnGPT</p>
      <Navigation />
      <div className="relative flex flex-col items-center justify-center w-full">
        <ProfileStats />
        <Profile />
      </div>
    </nav>
  );
};

export default Navbar;
