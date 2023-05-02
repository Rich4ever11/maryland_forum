import Image from "next/image";
import Link from "next/link";
import styles from "./Categories.module.css";
import Category from "./Category";
import OnlineMembers from "../OnlineMembers/OnlineMembers";
import ForumStats from "../OnlineMembers/ForumStats";
import { useState, useEffect } from "react";

export default function Categories({ title }) {
  const { categories } = {};

  return (
    <div>
      <div className="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-4 grid grid-cols-10">
        <div className="col-span-10">
          <h1 className="font-thin leading-tight text-6xl mt-0 mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-800 text-center">
            {title}
          </h1>
          {categories.map((category, index) => (
            <div className="p-2" key={index}>
              <Category
                title={category.name}
                description={category.description}
                sections={category.sections}
                threads={category.threads}
                messages={category.messages}
                userProfilePic={category.userProfilePic}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
