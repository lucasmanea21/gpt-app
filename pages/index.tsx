import type { NextPage } from "next";
import Head from "next/head";

import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

import Profile from "../components/Profile/Profile";
import Navbar from "../components/Navbar";
import { supabase } from "./api/supabase-client";
import { useAtom } from "jotai";
import { userInfoAtom, userSessionAtom } from "../store/atom";
import useGetUserData from "../hooks/useGetUserData";
import Chat from "../components/Chat";

const Home: NextPage = () => {
  useGetUserData();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <div className="flex justify-center">
        <Chat />
      </div>
    </div>
  );
};

export default Home;
