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
import { FaBrain, FaUserAlt } from "react-icons/fa";
import Link from "next/link";

const MobileNavbar = ({ tabs }: any) => {
  const Item = ({ name, link, icon }: any) => {
    return (
      <div className="flex items-center justify-center w-full p-2 space-x-3 rounded-md hover:bg-slate-600">
        <a href={link} className="font-5xl">
          {icon}
        </a>
      </div>
    );
  };
  return (
    <div className="flex w-full justify-between">
      {tabs.map((tab: any, i: any) => {
        return (
          <Item key={i} name={tab?.name} link={tab?.link} icon={tab?.icon} />
        );
      })}
    </div>
  );
};

const Navigation = ({ tabs }: any) => {
  const Item = ({ name, link, icon }: any) => {
    return (
      <a
        href={link}
        className="flex items-center w-full p-2 space-x-3 rounded-md hover:bg-slate-600"
      >
        {icon}

        <p className="text-lg">{name} </p>
      </a>
    );
  };

  return (
    <div className="flex flex-col items-center w-full p-5 space-y-3 rounded-lg">
      {tabs.map((tab: any, i: any) => {
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
        <MdQuiz size={16} />
        <p className="text-sm font-medium text-gray-200">
          {userInfo.quizzes ?? 0} quizuri
        </p>
      </div>
    </div>
  );
};

const Profile = () => {
  const [session] = useAtom(userSessionAtom);
  const [userInfo] = useAtom(userInfoAtom);

  const handleLogin = async () => {
    // redirect user to auth page
    window.location.href = "/auth";
  };

  return (
    <>
      {session ? (
        <>
          <div className="z-10 flex items-center justify-between w-full p-5 py-2 bg-gray-600 rounded-3xl">
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
          </div>
        </>
      ) : (
        <Button
          customClassName="filled w-full py-5 h-[50px] flex justify-center items-center text-center"
          onClick={() => handleLogin()}
        >
          Conecteaza-te
        </Button>
      )}
    </>
  );
};

const Navbar = () => {
  const [width, setWidth] = useState(0);
  const [isMobile, setisMobile] = useState(false);
  const [session] = useAtom(userSessionAtom);

  const tabs = [
    {
      name: "Home",
      icon: <BsFillLightbulbFill size={!isMobile ? 25 : 28} />,
      link: "/",
    },
    {
      name: "Quiz",
      icon: <MdQuiz size={!isMobile ? 25 : 28} />,
      link: "/quiz/create",
    },
    {
      name: "Leaderboard",
      icon: <BsTrophyFill size={!isMobile ? 25 : 28} />,
      link: "/clasament",
    },
    { name: "Profile", icon: <FaUserAlt size={28} />, link: "/profile" },
  ];

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    updateDimensions();
    setisMobile(window.innerWidth < 768);
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <nav className="sidebar">
      {!isMobile ? (
        <>
          <Link href="/" className="flex items-center space-x-3">
            <FaBrain size={30} className="text-blue-600" />
            <p className="text-2xl font-semibold text-gray-100">LearnGPT</p>
          </Link>
          <Navigation tabs={tabs} />
          <div className="relative flex flex-col items-center justify-center w-full">
            {session && <ProfileStats />}
            <Profile />
          </div>{" "}
        </>
      ) : (
        <MobileNavbar tabs={tabs} />
      )}
    </nav>
  );
};

export default Navbar;
