import styles from "./NavBar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { setLogout } from "../../utils/middleware";

export default function NavBar({ loginStatus }) {
  const router = useRouter();
  function handleOnClickHome(event) {
    event?.preventDefault;
    router.push("/");
  }

  function logOut(e) {
    setLogout(e);
  }

  return (
    <>
      <Popover className="relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between border-b border-rose-200 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/">
                <span className="sr-only">Maryland Forum</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src="/static/marylandflag.jpg"
                  alt=""
                />
              </Link>
            </div>
            <a
              href="/"
              className="hidden lg:block text-base font-medium text-slate-600 hover:text-slate-900"
            >
              Home
            </a>
            <a
              href="#"
              className="hidden lg:block text-base font-medium text-slate-600 hover:text-slate-900"
            >
              About Us
            </a>
            <a
              href="#"
              className="hidden lg:block text-base font-medium text-slate-600 hover:text-slate-900"
            >
              Docs
            </a>
            <a
              href="https://github.com/Rich4ever11"
              className="hidden lg:block text-base font-medium text-slate-600 hover:text-slate-900"
            >
              Github
            </a>

            <div className="items-center justify-end md:flex md:flex-1 lg:w-0">
              {loginStatus?.id ? (
                <>
                  <p className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                    {loginStatus?.username}
                  </p>
                  <a
                    href="/login"
                    className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-black-600 px-4 py-2 text-base font-medium text-white shadow-sm bg-red-700 hover:bg-red-600"
                    onClick={logOut}
                  >
                    Sign Out
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="/login"
                    className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    Sign in
                  </a>
                  <a
                    href="/signup"
                    className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-black-600 px-4 py-2 text-base font-medium text-white shadow-sm bg-red-700 hover:bg-red-600"
                  >
                    Sign up
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </Popover>
    </>
  );
}
