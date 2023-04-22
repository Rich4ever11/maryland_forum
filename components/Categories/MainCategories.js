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
      <div className="mb-10">
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
          <h1 className="font-extrabold leading-tight md:text-7xl text-6xl pb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-red-500 text-center">
            {"Maryland Photography"}
          </h1>
          <div className="-m-1 flex flex-wrap md:-m-2">
            <div className="flex w-1/2 flex-wrap">
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://bearfoottheory.com/wp-content/uploads/2020/02/great-falls-va.jpg"
                />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://assets3.thrillist.com/v1/image/3062242/1200x600/scale;"
                />
              </div>
              <div className="w-full p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://virginiatraveltips.com/wp-content/uploads/2021/08/Best-places-for-fall-in-Maryland.jpg"
                />
              </div>
            </div>
            <div className="flex w-1/2 flex-wrap">
              <div className="w-full p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://www.marylandzoo.org/wp-content/uploads/2021/03/SnowyOwlTracker3.jpg"
                />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://www.visittheusa.com/sites/default/files/styles/16_9_1280x720/public/images/hero_media_image/2018-12/94666d240389c46df88438e05cec5216.jpeg?h=a98222f4&itok=fbhjZTNE"
                />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://images.rove.me/maryland_w1280.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <></>
    </div>
  );
}
