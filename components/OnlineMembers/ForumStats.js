import { useState, useEffect } from "react";

export default function ForumStats() {
  const [forumStats, setForumStats] = useState({});

  useEffect(() => {
    async function getStats() {
      const response = await fetch(`/api/getStats`);
      const data = await response.json();
      setForumStats(data["forumStats"]);
    }
    getStats();
  }, []);

  return (
    <div className="invisible lg:visible">
      <div className="divide-y-4">
        <h1 className="font-extrabold leading-tight text-4xl mt-0 mb-2 text-transparent bg-clip-text bg-gradient-to-r  from-yellow-200 to-red-600  text-center">
          Forum Statistics
        </h1>
      </div>
      <div className="content-center m-0 pl-8">
        <table className="content-center m-0">
          <tbody>
            {Object.keys(forumStats).map((key, index) => (
              <tr>
                <td className="text-red-500 dark:text-red-400 text-md">
                  {key}
                </td>
                <td className="text-right text-md">{forumStats[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
