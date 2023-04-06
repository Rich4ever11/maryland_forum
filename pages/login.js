import NavBar from "@/components/NavBar/NavBar";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../styles/Login.module.css";
import Cookies from "js-cookie";

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

export default function Login({ tokenStatus }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function loginUser(e) {
    try {
      e.preventDefault();
      await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => response.json())
        .then(async (resultData) => {
          if (resultData?.data?.jwtStatus && resultData?.data?.token) {
            Cookies.set("token", resultData?.data?.token);
            // window.location.href = referer ? referer : "/";
            // const pathUrl = referer ? referer.lastIndexOf("/") : "/";
            await router.push("/");
          } else {
            alert("Failed To Login");
          }
        })
        .catch(console.error);
    } catch {
      alert("Failed To Login");
    }
  }

  return (
    <>
      <NavBar />
      <section className="bg-gray-50 dark:bg-gray-50">
        <h1 className="outline outline-offset-2 outline-1 leading-tight md:text-8xl text-6xl mt-0 py-4 text-transparent bg-clip-text bg-gradient-to-r from-stone-700 to-red-600 text-center">
          Login To Enter
        </h1>
        <div className="flex flex-row items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
          <div className="">
            <img
              src="/static/peopleClose.png"
              className="h-3/4 w-4/5 px-0"
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
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
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
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={loginUser}
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
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
