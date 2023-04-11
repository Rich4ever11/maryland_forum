import styles from "./Categories.module.css";
import Category from "./Category";
import OnlineMembers from "../OnlineMembers/OnlineMembers";
import ForumStats from "../OnlineMembers/ForumStats";

export default function MainCategory({ categories, title }) {
  const categoriesData = [
    {
      userProfilePic: "https://randomuser.me/api/portraits/men/21.jpg",
    },
    {
      userProfilePic: "https://randomuser.me/api/portraits/women/13.jpg",
    },
    {
      userProfilePic: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      userProfilePic: "https://randomuser.me/api/portraits/women/34.jpg",
    },
    {
      userProfilePic: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      userProfilePic: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      userProfilePic: "https://randomuser.me/api/portraits/men/41.jpg",
    },
  ];

  return (
    <div>
      <div className="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-4 grid grid-cols-10">
        <div className="lg:col-span-8 col-span-10">
          <h1 className="font-extrabold leading-tight md:text-6xl text-5xl pb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-red-500 text-center">
            {title}
          </h1>
          {categoriesData.map((category, index) => (
            <div className="p-2" key={index}>
              <Category
                categoryId={categories[index].categoryId}
                title={categories[index].name}
                description={categories[index].description}
                sections={categories[index].sections}
                threadCount={categories[index].threadCount}
                messageCount={categories[index].messageCount}
                userProfilePic={"https://i.redd.it/6enjuad2sa671.png"}
                imgUrl={categories[index].logoUrl}
              />
            </div>
          ))}
        </div>
        <div
          className="grid grid-row-6 col-span-2 invisible lg:visible h-96"
          id={styles.statSection}
        >
          <OnlineMembers />
          <ForumStats />
        </div>
      </div>
      <></>
    </div>
  );
}
