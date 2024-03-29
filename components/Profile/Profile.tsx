import Image from "next/image";
import React, { useEffect, useState } from "react";
import { supabase } from "../../pages/api/supabase/supabase-client";
import Card from "../Cards";
import Input from "../Input";
import { useForm } from "react-hook-form";

import { useAtom } from "jotai";
import { userInfoAtom, userSessionAtom } from "../../store/atom";
import Button from "../Button";
import SectionWrapper from "../Wrappers";
import BgCard from "../Cards/BgCard";

const EditProfile = ({
  setIsEdit,
  userInfo,
}: {
  setIsEdit: any;
  userInfo: any;
}) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <Card>
      <div className="w-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-2/3 flex flex-col items-center justify-center"
        >
          <div className="flex flex-col space-y-3 mb-5 w-full">
            <input
              {...register("name")}
              placeholder="Name"
              className="p-3"
              defaultValue={userInfo?.full_name}
            />
            <input
              {...register("bio")}
              placeholder="Bio"
              className="p-3"
              defaultValue={userInfo?.bio}
            />
          </div>

          <Button
            onClick={() => setIsEdit(false)}
            className="filled inliine-block w-fit "
          >
            Save changes
          </Button>
        </form>
      </div>
    </Card>
  );
};

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [session] = useAtom(userSessionAtom);
  const [userInfo] = useAtom(userInfoAtom);

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    // after signing out, send the user to the main page
    window.location.href = "/";
  };

  return (
    <SectionWrapper>
      {!session && (
        <button onClick={() => handleLogin()}>Log in with Google</button>
      )}
      {session?.user && (
        <>
          {!isEdit ? (
            <BgCard>
              <div className="w-full flex flex-col justify-center items-center">
                <div className="flex justify-between w-full space-x-12 ">
                  <Image
                    src={session?.user.user_metadata.picture}
                    width={150}
                    height={150}
                    alt="pfp"
                  />
                  <div className="w-3/4 flex flex-col justify-between">
                    <div className="">
                      <p className="text-3xl">{userInfo?.full_name} </p>
                      <p className="text-md text-gray-400 mt-1">
                        {userInfo?.bio ?? "Nicio descriere."}{" "}
                      </p>
                    </div>
                    <div className="flex">
                      <Button
                        onClick={() => setIsEdit(true)}
                        className="filled inliine-block w-fit "
                      >
                        Edit profile
                      </Button>
                      <Button
                        onClick={handleLogout}
                        className="bg-red-600 ml-3"
                      >
                        Log out
                      </Button>
                    </div>
                  </div>
                </div>
                {/* <div className="mt-10">
                  <Input session={session} />
                </div> */}
              </div>
            </BgCard>
          ) : (
            <EditProfile setIsEdit={setIsEdit} userInfo={userInfo} />
          )}
        </>
      )}
    </SectionWrapper>
  );
};

export default Profile;
