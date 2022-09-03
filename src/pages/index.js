import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Quote from "../components/Quote";
import BaseTitle from "../components/base/BaseTitle";

export default function Home() {
  const appTitle = "EstateLaza";
  const appSummary =
    "Manage inventories of your home with EstateLaza, at ease...";

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans leading-normal tracking-normal">
      <Head>
        <title>{appTitle}</title>
        <meta
          name="description"
          content="EstateLaza is an easy-to-learn and easy-to-use tool for general estate and asset management, including non-routine maintenance activities."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full bg-cover bg-center">
        <div className="flex justify-center h-full w-full bg-blue-900">
          <div className="text-center py-2 px-3 items-baseline">
            <h1 className="text-white text-xl font-semibold uppercase md:text-l">
              {appTitle}
            </h1>
            <h2 className="text-white md:text-l">{appSummary}</h2>
          </div>
        </div>
      </div>
      <div className="">
        {/* Main screen */}
        <main className="">
          <div
            className="flex justify-center bg-cover bg-bottom bg-sky-100"
            style={{ "background-image": "url(/images/hero.jpg)" }}
          >
            <div className="ml-auto mr-auto py-32">
              <div className="bg-white border rounded shadow flex flex-col">
                <div className="p-3 border-b">
                  <BaseTitle size="main" className="text-center -my-3">
                    Management Made Easy
                  </BaseTitle>
                </div>
                <div className="p-3 text-center">
                  EstateLaza is an easy-to-learn and easy-to-use tool <br />
                  for general estate and asset management.
                </div>
              </div>
              <div className="text-center mt-8">
                <Link href="/home">
                  <a className="bg-blue-700 text-white hover:bg-blue-600 rounded shadow px-10 py-3">
                    Try it now!
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <Quote />

          <div className="flex flex-col md:flex-row md:justify-around p-6 gap-7 md:gap-0">
            <div className="flex flex-row justify-between md:flex-col gap-5 p-2">
              <div className="m-auto">
                <div className="bg-white p-3 border rounded shadow flex flex-col flex-shrink">
                  <BaseTitle size="large" className="-my-3">
                    For Families
                  </BaseTitle>
                </div>
              </div>
              <Image
                src="/images/family-home.png"
                layout="fixed"
                alt="Icon of a house with a heart shape inside it"
                width={150}
                height={150}
              />
            </div>
            <div className="flex flex-row-reverse justify-between md:flex-col gap-5 p-2">
              <div className="m-auto">
                <div className="bg-white p-3 border rounded shadow flex flex-col flex-shrink">
                  <BaseTitle size="large" className="-my-3">
                    For Roommates
                  </BaseTitle>
                </div>
              </div>
              <Image
                src="/images/apartment.png"
                layout="fixed"
                alt="Icon of a housing complex"
                width={150}
                height={150}
              />
            </div>
            <div className="flex flex-row justify-between md:flex-col gap-5 p-2">
              <div className="m-auto">
                <div className="bg-white p-3 border rounded shadow flex flex-col flex-shrink">
                  <BaseTitle size="large" className="-my-3">
                    For Businesses
                  </BaseTitle>
                </div>
              </div>
              <Image
                src="/images/business.png"
                layout="fixed"
                alt="Icon of a tall business building"
                width={150}
                height={150}
              />
            </div>
            <div className="flex flex-row-reverse justify-between md:flex-col gap-5 p-2">
              <div className="m-auto">
                <div className="bg-white p-3 border rounded shadow flex flex-col flex-shrink">
                  <BaseTitle size="large" className="-my-3">
                    For Everyone
                  </BaseTitle>
                </div>
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
