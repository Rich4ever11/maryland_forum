import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import NavBar from "@/components/NavBar/NavBar";
import MainCategories from "@/components/Categories/MainCategories";
import Categories from "@/components/Categories/Categories";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

import { absoluteUrl, getAppCookies, verifyToken } from "../utils/middleware";

export async function getServerSideProps(context) {
  const { req } = context;
  const { token } = getAppCookies(req);
  const tokenStatus = token ? verifyToken(token.split(" ")[1]) : "";
  const res = await fetch("http://localhost:3000/api/categories");
  const categories = await res.json();
  return {
    props: { tokenStatus, categories: categories.categories },
  };
}

export default function Home({ tokenStatus, categories }) {
  return (
    <>
      <Head>
        <title>Maryland Forum</title>
        <meta
          name="description"
          content="interesting place to post content anonymously"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavBar loginStatus={tokenStatus.id} />
        <div className={styles.heroImage}>
          <Image src="/static/friends.webp" width={520} height={500} alt={""} />
        </div>
        <h1 className="font-extrabold outline outline-offset-2 outline-1 leading-tight md:text-8xl text-7xl mt-0 mb-2 pb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-600 text-center">
          Maryland Forum
        </h1>
        {categories.length && (
          <MainCategories
            title="Maryland Universities & Colleges"
            categories={categories}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
