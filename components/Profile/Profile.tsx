import Image from "next/image";
import React, { useEffect, useState } from "react";
import { supabase } from "../../pages/api/supabase-client";
import Card from "../Cards";
import Input from "../Input";
import { useForm } from "react-hook-form";

import { useAtom } from "jotai";
import { userInfoAtom, userSessionAtom } from "../../store/atom";
import Button from "../Button";
import SectionWrapper from "../Wrappers";

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
            customClassName="filled inliine-block w-fit "
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
            <Card>
              <div className="w-full flex flex-col justify-center items-center">
                <div className="flex justify-between w-2/3 space-x-5 mb-10">
                  <Image
                    src={session?.user.user_metadata.picture}
                    width={150}
                    height={150}
                    alt="pfp"
                  />
                  <div className="w-3/4 flex flex-col justify-between">
                    <div className="">
                      <p className="text-xl">{userInfo?.full_name} </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {userInfo?.bio ?? "Nicio descriere."}{" "}
                      </p>
                    </div>
                    <Button
                      onClick={() => setIsEdit(true)}
                      customClassName="filled inliine-block w-fit "
                    >
                      Edit profile
                    </Button>
                  </div>
                </div>
                <button onClick={handleLogout}>Log out</button>
                <div className="mt-10">
                  <Input session={session} />
                </div>
              </div>
            </Card>
          ) : (
            <EditProfile setIsEdit={setIsEdit} userInfo={userInfo} />
          )}
        </>
      )}
    </SectionWrapper>
  );
};

export default Profile;
