export default function ForumStats() {
  const forumInfo = [
    { name: "Threads:", count: "920,543" },
    { name: "Messages:", count: "48,022,270" },
    { name: "Members:", count: "27,590" },
    { name: "Latest member:", count: "Vickyyyy32" },
  ];

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
            {forumInfo.map((info, index) => (
              <tr>
                <td className="text-red-500 dark:text-red-400 text-md">
                  {info.name}
                </td>
                <td className="text-right text-md">{info.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
