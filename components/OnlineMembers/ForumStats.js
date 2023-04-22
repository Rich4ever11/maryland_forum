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
    <>
      <div className="divide-y-4">
        <h1 className="font-extrabold leading-tight text-4xl mt-0 mb-2 text-transparent bg-clip-text bg-gradient-to-r  from-yellow-200 to-red-600  text-center">
          Forum Statistics
        </h1>
      </div>
      <div className="invisible lg:visible my-4 backdrop-blur-sm bg-red-50 rounded-xl background: rgba(255, 255, 255, 0.22); border-radius: 16px; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); backdrop-filter: blur(4.1px); -webkit-backdrop-filter: blur(4.1px); border: 1px solid rgba(255, 255, 255, 0.15);">
        <div className="content-center m-0 pl-8">
          <table className="content-center m-0">
            <tbody>
              {Object.keys(forumStats).map((key, index) => (
                <tr key={key}>
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
    </>
  );
}
