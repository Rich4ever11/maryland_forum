import NavBar from "@/components/NavBar/NavBar";
import styles from "@/styles/SignUp.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
const fs = require("fs");

/* middleware */
import { getAppCookies, verifyToken, setLogout } from "../utils/middleware";

export async function getServerSideProps(context) {
  const { req } = context;
  const { token } = getAppCookies(req);
  const tokenStatus = token ? verifyToken(token.split(" ")[1]) : "";
  if (tokenStatus) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
  return {
    props: { tokenStatus },
  };
}

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [toggleEmailError, setToggleEmailError] = useState(false);
  const [toggleUsernameError, setToggleUsernameError] = useState(false);

  const router = useRouter();

  async function checkUsernameTaken(username) {
    const result = await fetch("http://localhost:3000/api/checkUsernameTaken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
      }),
    });
    const foundUsers = await result.json();
    if (foundUsers["usernameFound"].length === 0) {
      return true;
    } else if (foundUsers["usernameFound"].length > 0) {
      return false;
    }
  }

  function checkEmail(email) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const found = email.match(mailformat);
    return found;
  }

  async function SignUpUser(e) {
    e.preventDefault();
    if ((await checkUsernameTaken(username)) && checkEmail(email)) {
      await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          name,
          password,
        }),
      });
      await router.push("/login");
    } else if (!checkEmail(email)) {
      setToggleEmailError(true);
    } else {
      setToggleUsernameError(true);
    }
  }

  return (
    <>
      <NavBar />
      <section className="bg-gray-50 dark:bg-gray-50">
        <h1 className="outline outline-offset-2 outline-1 leading-tight md:text-8xl text-6xl mt-0 pb-4 text-transparent bg-clip-text bg-gradient-to-r from-stone-700 to-red-600 text-center">
          Create Your Account
        </h1>
        <div className="flex flex-row items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
          <div className="">
            <img
              src="/static/collegeStudentOne.png"
              className="h-3/4 w-3/4"
              alt="Sample image"
              id={styles.heroImage}
            />
          </div>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <a
              href="#"
              className="flex flex-col pt-4 items-center mb-6 text-4xl font-semibold text-gray-900 dark:text-white "
            >
              <img
                className="w-24 h-24 mr-2 rounded-full"
                src="/static/marylandflag.jpg"
                alt="logo"
              />
              Maryland Forum
            </a>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create Your Account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Username
                  </label>
                  <input
                    type="username"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Username"
                    required=""
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setToggleUsernameError(false);
                    }}
                  />
                </div>
                {toggleUsernameError ? (
                  <div
                    className="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                    role="alert"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 inline w-5 h-5 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">Username Found!</span>{" "}
                      Please enter a new username.
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setToggleEmailError(false);
                    }}
                  />
                </div>
                {toggleEmailError ? (
                  <div
                    className="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                    role="alert"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 inline w-5 h-5 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">Invalid Email!</span> Please
                      enter a valid email.
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Full Name
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John Doe"
                    required=""
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="flex items-center justify-between"></div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={SignUpUser}
                >
                  Sign Up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
