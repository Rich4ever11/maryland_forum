import NavBar from "@/components/NavBar/NavBar";
import ForumList from "@/components/Forum/ForumList";
import { getAppCookies, verifyToken } from "../../../../utils/middleware";

export async function getServerSideProps(context) {
  const { req } = context;
  const { token } = getAppCookies(req);
  const tokenStatus = token ? verifyToken(token.split(" ")[1]) : "";
  const { forumId, categoryId } = context?.query;
  const res = await fetch(
    `http://localhost:3000/api/forums?categoryId=${categoryId}`
  );
  const forums = await res.json();
  if (forums.error) {
    return {
      notFound: true,
    };
  }
  const forumData = forums.forumData.forumDataList.filter((forum) => {
    return forum.forumId == forumId;
  });
  return {
    props: {
      tokenStatus,
      categoryName: forums.forumData.categoryName[0].name,
      forumData,
    },
  };
}

export default function Forum({ tokenStatus, categoryName, forumData }) {
  const { name, description, categoryId, forumId } = forumData[0];

  return (
    <>
      <NavBar loginStatus={tokenStatus} />
      <h1 className="font-black outline outline-offset-2 outline-1 leading-tight p-10 md:text-8xl text-6xl mt-0 mb-2 pb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-red-600 text-center">
        {categoryName}
      </h1>
      <ForumList
        disabled={true}
        title={name}
        forumId={forumId}
        categoryId={categoryId}
        description={description}
        enableThreadCreation={tokenStatus.id}
      />
    </>
  );
}
