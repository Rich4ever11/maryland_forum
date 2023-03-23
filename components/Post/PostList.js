import Post from "../Post/Post";

export default function PostList({ postData }) {
  return (
    <div className="">
      {postData.map((post, index) => (
        <Post
          key={index}
          id={post.postId}
          text={post.text}
          publishedAt={post.publishedAt}
          creatorId={post.creatorId}
        ></Post>
      ))}
    </div>
  );
}
