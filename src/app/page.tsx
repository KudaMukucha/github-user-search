"use client";

import DarkAndLightButton from "@/components/DarkAndLightButton";
import SearchAndButton from "@/components/SearchAndButton";
import Image from "next/image";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import { RiTwitterXFill } from "react-icons/ri";
import { BsBuildingsFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
// import dateFormat from 'date-format'
import format from "date-fns";
import { FormEvent, useState } from "react";

type GitHubUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string | null;
  blog: string;
  location: string;
  email: string | null;
  hireable: boolean | null;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  documentation_url: string;
  message: string;
};

export default function Home() {
  const [userName, setUserName] = useState("github");

  const { isLoading, error, data, refetch } = useQuery<GitHubUser>({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`https://api.github.com/users/${userName}`).then((res) =>
        res.json()
      ),
  });
  console.log("data-", data);
  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="flex min-h-screen w-full  p-1.5 sm:p-4 pt-10 sm:pt-12 transition-all dark:bg-slate-900 bg-stone-100">
      {/* container */}
      <div className="mx-auto flex w-full max-w-[600px] flex-col gap-8 rounded p-2">
        <section className="flex justify-between gap-3">
          <p className="text-xl font-semibold">devfinder</p>
          <DarkAndLightButton />
        </section>

        {/*search and main */}
        <section className="flex flex-col gap-6">
          {/* search and button  */}
          <SearchAndButton
            onChange={(e) => setUserName(e.target.value)}
            onSubmit={handleSubmit}
            value={userName}
          />

          {data?.message ? (
            <div className="flex w-full flex-col gap-5 rounded-lg bg-white dark:bg-slate-800 px-4 py-8 text-center text-red-400">
              User Not found
            </div>
          ) : (
            <main className="flex flex-col w-full rounded-lg gap-5 bg-white dark:bg-slate-800 px-4 py-8 min-h-[200px]">
              <section className="flex gap-4">
                {/* User Image */}
                <Image
                  src={data?.avatar_url ?? ""}
                  alt={"user image"}
                  width={200}
                  height={200}
                  className={"h-20 w-20 rounded-full"}
                />
                <section className="flex  flex-col justify-between gap-1 transition-all sm:w-full sm:flex-row">
                  <div>
                    {/*  name */}
                    <h1>{data?.name}</h1>
                    {/* user id */}
                    <Link
                      href={`https://github.com/${data?.login}/`}
                      target={"_blank"}
                      className={
                        "text-blue-500 hover:underline text-sm transition-all"
                      }
                    >
                      @{data?.login}
                    </Link>
                  </div>
                  {/* joining date */}
                  <p className="text-sm">
                    <span>Joined at</span>
                    {/* <span> {dateFormat(data?.created_at,'dd mmm yyyy')}</span> */}
                    <span> {data?.created_at}</span>
                  </p>
                </section>
              </section>

              <section className="flex flex-col gap-5">
                <p>
                  {data?.bio ?? (
                    <span className="opacity-60">This profile has no bio</span>
                  )}
                </p>
                {/* repo and followers */}
                <div className="flex justify-between gap-3 rounded-lg bg-stone-100 px-6 py-4 dark:bg-slate-900 min-h-[50px]">
                  {/* item 1 */}
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-xs opacity-60">Repos</p>
                    <p className="text-sm font-bold sm:text-base">
                      {data?.public_repos}
                    </p>
                  </div>
                  {/* item 2 */}
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-xs opacity-60">Followers</p>
                    <p className="text-sm font-bold sm:text-base">
                      {data?.followers}
                    </p>
                  </div>
                  {/* item 3 */}
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-xs opacity-60">Following</p>
                    <p className="text-sm font-bold sm:text-base">
                      {data?.following}
                    </p>
                  </div>
                </div>
                {/* address and extra info */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* item 1 */}
                  <div className="flex items-center gap-2">
                    {/* icon */}
                    <IoLocationOutline className="text-xl" />
                    <p>
                      {data?.location ?? (
                        <span className="opacity-60">Not available</span>
                      )}
                    </p>
                  </div>
                  {/* item 2 */}
                  <div className="flex items-center gap-2">
                    {/* icon */}
                    <IoIosLink className="text-xl" />
                    {data?.blog ? (
                      <Link
                        title={data?.blog}
                        className="hover:underline opacity-60 max-w-[200px] overflow-hidden text-ellipsis"
                        href={data?.blog}
                      >
                        {data?.blog}
                      </Link>
                    ) : (
                      <span className="opacity-60">Not available</span>
                    )}
                  </div>
                  {/* item 3 */}
                  <div className="flex items-center gap-2">
                    {/* icon */}
                    <RiTwitterXFill className="text-xl" />
                    <p>
                      {data?.twitter_username ?? (
                        <span className="opacity-60">Not available</span>
                      )}
                    </p>
                  </div>
                  {/* item 4 */}
                  <div className="flex items-center gap-2">
                    {/* icon */}
                    <BsBuildingsFill className="text-xl" />
                    <p>
                      {data?.company ?? (
                        <span className="opacity-60">Not available</span>
                      )}
                    </p>
                  </div>
                </div>
              </section>
            </main>
          )}
        </section>
      </div>
    </div>
  );
}
