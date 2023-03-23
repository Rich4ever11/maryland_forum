import styles from "./Categories.module.css";
import Category from "./Category";
import OnlineMembers from "../OnlineMembers/OnlineMembers";
import ForumStats from "../OnlineMembers/ForumStats";

export default function MainCategory({ categories, title }) {
  const categoriesData = [
    {
      title: "University of Maryland, Baltimore County",
      description:
        "University of Maryland, Baltimore County is a public institution that was founded in 1966.",
      sections: ["Sports", "Entertainment", "Misc"],
      threads: "107.1K",
      messages: "11.3M",
      userProfilePic: "https://randomuser.me/api/portraits/men/21.jpg",
      imgUrl: "/static/UMBClogo.png",
    },
    {
      title: "University of Maryland",
      description:
        "UMD is consistently recognized as one of the preeminent public research universities in the United States.",
      sections: ["Sports", "Entertainment", "Misc"],
      threads: "243.1K",
      messages: "7.2M",
      userProfilePic: "https://randomuser.me/api/portraits/women/13.jpg",
      imgUrl: "/static/UMDlogo.png",
    },
    {
      title: "Johns Hopkins University",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc interdum leo nec metus sollicitudin congue. Pellentesque magna urna, interdum in ullamcorper eu, faucibus vitae tellus. ",
      sections: ["Sports", "Entertainment", "Misc"],
      threads: "366.8K",
      messages: "16.6M",
      userProfilePic: "https://randomuser.me/api/portraits/women/45.jpg",
      imgUrl: "/static/JHUlogo.png",
    },
    {
      title: "Towson University",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc interdum leo nec metus sollicitudin congue. Pellentesque magna urna, interdum in ullamcorper eu, faucibus vitae tellus. ",
      sections: ["Sports", "Entertainment", "Misc"],
      threads: "40.2K",
      messages: "2.2M",
      userProfilePic: "https://randomuser.me/api/portraits/women/34.jpg",
      imgUrl: "/static/TUlogo.png",
    },
    {
      title: "Salisbury University",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc interdum leo nec metus sollicitudin congue.",
      sections: ["Sports", "Entertainment", "Misc"],
      threads: "27.1K",
      messages: "2.2M",
      userProfilePic: "https://randomuser.me/api/portraits/women/7.jpg",
      imgUrl: "/static/SUlogo.png",
    },
    {
      title: "Morgan State University",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc interdum leo nec metus sollicitudin congue.",
      sections: ["Sports", "Entertainment", "Misc"],
      threads: "29.6K",
      messages: "2.9M",
      userProfilePic: "https://randomuser.me/api/portraits/men/11.jpg",
      imgUrl: "/static/MSUlogo.png",
    },
    {
      title: "Bowie State University",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc interdum leo nec metus sollicitudin congue.",
      sections: ["Sports", "Entertainment", "Misc"],
      threads: "29.6K",
      messages: "2.9M",
      userProfilePic: "https://randomuser.me/api/portraits/men/41.jpg",
      imgUrl: "/static/BUlogo.png",
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
                sections={category.sections}
                threads={category.threads}
                messages={category.messages}
                userProfilePic={category.userProfilePic}
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
