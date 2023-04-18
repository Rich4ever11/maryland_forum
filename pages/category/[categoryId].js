import { useRouter } from "next/router";
import NavBar from "@/components/NavBar/NavBar";
import ForumList from "../../components/Forum/ForumList";

import { getAppCookies, verifyToken } from "../../utils/middleware";

export async function getServerSideProps(context) {
  const { req } = context;
  const { token } = getAppCookies(req);
  const tokenStatus = token ? verifyToken(token.split(" ")[1]) : "";
  const { categoryId } = context?.query;
  const res = await fetch(
    `http://localhost:3000/api/forums?categoryId=${categoryId}`
  );
  const forums = await res.json();
  if (forums.error) {
    return {
      notFound: true,
    };
  }
  return {
    props: { tokenStatus, forums },
  };
}

export default function Category({ tokenStatus, forums }) {
  const schoolName = forums.forumData.categoryName[0].name;
  const forumData = forums.forumData.forumDataList;

  const router = useRouter();
  const { categoryId } = router?.query;

  return (
    <div>
      <NavBar loginStatus={tokenStatus.id} />
      <h1 className="font-extrabold outline outline-offset-2 outline-1 leading-tight p-10 md:text-8xl text-6xl mt-0 mb-2 pb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-red-600 text-center">
        {schoolName}
      </h1>
      {forumData.map((forumInfo, index) => (
        <div className="p-2" key={index}>
          <ForumList
            title={forumInfo.name}
            disabled={false}
            forumId={forumInfo.forumId}
            categoryId={categoryId}
            description={forumInfo.description}
            enableThreadCreation={tokenStatus.id}
          />
        </div>
      ))}
    </div>
  );
}
