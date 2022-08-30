import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import Header from "../components/Header";
import Quote from "../components/Quote";
import BaseTitle from "../components/base/BaseTitle";
import BaseButton from "../components/base/BaseButton";

export default function Home() {
  const appTitle = "EstateLaza";
  const appSummary =
    "Manage inventories of your home with EstateLaza, at ease...";

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans leading-normal tracking-normal">
      <Toaster />
      <Head>
        <title>{appTitle}</title>
        <meta
          name="description"
          content="EstateLaza is an easy-to-learn and easy-to-use tool for general estate and asset management, including non-routine maintenance activities."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title={appTitle} summary={appSummary} />
      <div className="flex flex-1 gap-3 p-3">
        {/* Main screen */}
        <main className="flex flex-col flex-1 gap-3">
          <div className="flex justify-around p-3">
            <div className="flex flex-col gap-3 p-3">
              <div className="bg-white border rounded shadow flex flex-col">
                <div className="flex items-center p-3 border-b">
                  <BaseTitle size="main" className="-my-3">
                    Management Made Easy
                  </BaseTitle>
                </div>
                <div className="p-3 flex-grow">
                  EstateLaza is an easy-to-learn and easy-to-use tool <br />
                  for general estate and asset management.
                </div>
              </div>
              <div className="text-center">
                <Link href="/home">
                  <a className="px-10 py-2 hover:underline">Try it now!</a>
                </Link>
              </div>
            </div>
            <Quote />
          </div>
          <div className="flex justify-around p-5">
            <div className="flex flex-col gap-5 p-2 pt-0">
              <div className="bg-white p-3 border rounded shadow flex flex-col">
                <BaseTitle size="large" className="-my-3">
                  For Families
                </BaseTitle>
              </div>
              <Image
                src="/images/family-home.png"
                layout="fixed"
                alt="Icon of a house with a heart shape inside it"
                width={150}
                height={150}
              />
            </div>
            <div className="flex flex-col gap-5 p-2 pt-12">
              <div className="bg-white p-3 border rounded shadow flex flex-col">
                <BaseTitle size="large" className="-my-3">
                  For Roommates
                </BaseTitle>
              </div>
              <Image
                src="/images/apartment.png"
                layout="fixed"
                alt="Icon of a housing complex"
                width={150}
                height={150}
              />
            </div>
            <div className="flex flex-col gap-5 p-2 pt-24">
              <div className="bg-white p-3 border rounded shadow flex flex-col">
                <BaseTitle size="large" className="-my-3">
                  For Businesses
                </BaseTitle>
              </div>
              <Image
                src="/images/business.png"
                layout="fixed"
                alt="Icon of a tall business building"
                width={150}
                height={150}
              />
            </div>
            <div className="flex flex-col gap-5 p-2 pt-36">
              <div className="bg-white p-3 border rounded shadow flex flex-col">
                <BaseTitle size="large" className="my-3">
                  For Everyone
                </BaseTitle>
              </div>
              <Image
                src="/images/person.png"
                layout="fixed"
                alt="Icon of a person"
                width={150}
                height={150}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
