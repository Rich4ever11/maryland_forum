import styles from "./OnlineMembers.module.css";
import { useState, useEffect } from "react";

export default function OnlineMembers() {
  const [newUserList, setNewUserList] = useState({});

  useEffect(() => {
    async function getNewUsers() {
      const response = await fetch(`/api/getUserData`);
      const data = await response.json();
      setNewUserList(data["latestUsers"]);
    }
    getNewUsers();
  }, []);

  return (
    <>
      <div className="invisible lg:visible" id={styles.section}>
        <h1 className="font-extrabold leading-tight text-4xl mt-0 mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-red-600  text-center">
          Newest Members
        </h1>
        <div
          className="h-80 overflow-y-scroll scrollbar-thin scrollbar-thumb-red-700 scrollbar-track-red-300"
          id={styles.scrollbar}
        >
          <table className="table-auto px-4 py-6 sm:px-0">
            <tbody className=" rounded-lg border-red-100">
              {Object.keys(newUserList).map((username, index) => (
                <tr
                  className="grid grid-cols-4 bg-red-50 p-2 container rounded-full my-2"
                  key={index}
                >
                  <td>
                    <div className="flex col-span-2 p-1">
                      <img
                        className="rounded-full shadow align-middle border-gray-100 "
                        src="\static\marylandflag.jpg"
                        alt=""
                        width={100}
                        height={10}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="text-sm p-2 text-center md:text-left col-span-2">
                      <figcaption className="font-medium text-center">
                        <div className="text-red-500 dark:text-red-400 text-center text-md">
                          {newUserList[username].username}
                        </div>
                      </figcaption>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
