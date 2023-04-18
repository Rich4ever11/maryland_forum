const { createPool } = require("mysql2/promise");
const crypto = require("crypto");
const salt = process.env.NEXT_PUBLIC_SQL_SALT;

const pool = createPool({
  host: "localhost",
  user: "root",
  password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
});

export async function getCategoryData() {
  try {
    const categoryData = await pool.query("SELECT * FROM forum.category");
    //get the newest message in the category
    //user's photo URL in the category
    //time of post
    //users name
    //get the thread count & message count for each category
    let counter = 0;
    for (let i = 4; i <= 28; i += 4) {
      let sportId = i - 3;
      let entertainmentId = i - 2;
      let miscId = i - 1;
      let generalId = i;
      var messageCount = 0;

      const threadCount = await pool.query(
        `SELECT threadId FROM forum.thread WHERE forumId=${sportId} OR forumId=${entertainmentId} OR forumId=${miscId} OR forumId=${generalId}`
      );
      for (let j = 0; j < threadCount[0].length; j++) {
        const queryResponse = await pool.query(
          `SELECT postId FROM forum.post WHERE threadId=${threadCount[0][j].threadId}`
        );
        messageCount += queryResponse[0].length;
      }
      categoryData[0][counter]["threadCount"] = threadCount[0].length;
      //get the message count in the category
      categoryData[0][counter]["messageCount"] = messageCount;
      categoryData[0][counter]["sections"] = [
        { name: "Sports", forumId: sportId },
        { name: "Entertainment", forumId: entertainmentId },
        { name: "Misc", forumId: miscId },
        { name: "General", forumId: generalId },
      ];
      counter++;
    }
    return categoryData[0];
  } catch (err) {
    return err.stack;
  }
}

export async function getForumData(categoryId = 0) {
  //Get forum
  try {
    const sqlParams = [categoryId];
    if (categoryId !== 0) {
      let forumQuery = "SELECT * FROM forum.forum WHERE categoryId=?";
      let categoryQuery = "SELECT name FROM forum.category WHERE categoryId=?";
      const forumData = await pool.query(
        forumQuery,
        sqlParams,
        function (err, result) {
          if (err) throw err;
        }
      );
      const CategoryName = await pool.query(
        categoryQuery,
        sqlParams,
        function (err, result) {
          if (err) throw err;
        }
      );
      return { categoryName: CategoryName[0], forumDataList: forumData[0] };
    } else {
      const forumData = await pool.query(`SELECT * FROM forum.forum`);
      return { forumDataList: forumData[0] };
    }
  } catch (err) {
    return err.stack;
  }
}

export async function getThreadData(forumId = undefined, threadId = undefined) {
  try {
    if (forumId !== undefined && threadId === undefined) {
      const threadsFromForumId = await pool.query(
        `SELECT * FROM forum.thread WHERE forumId=${forumId}`
      );
      for (var i = 0; i < threadsFromForumId[0].length; i++) {
        const currentThread = threadsFromForumId[0][i];
        const lastPostId = currentThread.lastPostId;
        const creatorId = currentThread.creatorId;
        const creatorInfo = await pool.query(
          `SELECT username, avatar, userId FROM forum.users WHERE userId=${creatorId}`
        );
        threadsFromForumId[0][i] = {
          ...currentThread,
          ...creatorInfo[0],
        };
      }
      return threadsFromForumId[0];
    } else if (threadId !== undefined) {
      const threadData = await pool.query(
        `SELECT * FROM forum.thread WHERE threadId=${threadId}`
      );
      return threadData[0];
    } else {
      return [];
    }
  } catch (err) {
    return err.stack;
  }
}

export async function getPostsAndCurrThread(threadId = undefined) {
  try {
    if (parseInt(threadId) >= 0) {
      //Gets all the data for the thread
      const threadData = await pool.query(
        `SELECT * FROM forum.thread WHERE threadId=${threadId}`
      );
      const threadCreatorData = await pool.query(
        `SELECT username FROM forum.users WHERE userId=${threadData[0][0]["creatorId"]}`
      );
      threadData[0][0].creatorUsername = threadCreatorData[0][0]["username"];

      //obtains all the data for each post
      const postResultList = await pool.query(
        `SELECT * FROM forum.post WHERE threadId=${threadId}`
      );
      var postList = [];
      var contributors = [];
      for (const postData of postResultList[0]) {
        const creatorId = postData["creatorId"];
        const postCreatorData = await pool.query(
          `SELECT username, registeredAt FROM forum.users WHERE userId=${creatorId}`
        );
        const userPostCount = await pool.query(
          `SELECT postId FROM forum.post WHERE creatorId=${creatorId}`
        );

        const newPostData = {
          ...postData,
          creatorUsername: postCreatorData[0][0]["username"],
          creatorRegisteredAt: postCreatorData[0][0]["registeredAt"],
          messageCount: userPostCount[0].length,
        };

        if (contributors.indexOf(newPostData.creatorUsername) == -1) {
          contributors.push(newPostData.creatorUsername);
        }

        postList.push(newPostData);
      }
      threadData[0][0].contributors = contributors;

      const data = {
        threadData: threadData[0][0],
        postData: postList,
      };
      return data;
    } else if (parseInt(threadId) === -1) {
      const threadData = await pool.query(`SELECT threadId FROM forum.thread`);
      return threadData[0];
    } else {
      return [];
    }
  } catch (err) {
    return err.stack;
  }
}

export async function signUpUser(username, email, name, avatar, password) {
  try {
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password + salt)
      .digest("base64");
    const sqlParams = [username, email, name, avatar, hashedPassword];
    let insertUserStatement =
      "INSERT INTO forum.users SET username = ?, email = ?, name = ?, avatar = ?, password = ?";
    const result = await pool.query(
      insertUserStatement,
      sqlParams,
      function (err, result) {
        if (err) throw err;
      }
    );
    return result;
  } catch (err) {
    return err.stack;
  }
}

export async function authUser(email, password) {
  try {
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password + salt)
      .digest("base64");
    const sqlParams = [email, hashedPassword];
    let insertUserStatement =
      "SELECT * FROM forum.users WHERE email=? AND password=?";
    const result = await pool.query(
      insertUserStatement,
      sqlParams,
      function (err, result) {
        if (err) throw err;
      }
    );
    return result[0];
  } catch (err) {
    return err.stack;
  }
}

export async function createNewThread(threadData) {
  const { lastPostId, title, creatorId, forumId } = threadData;
  try {
    const sqlParams = [lastPostId, title, creatorId, forumId];
    let newThreadQuery =
      "INSERT INTO forum.thread SET lastPostId = ?, title = ?, creatorId = ?, forumId = ?";
    const result = await pool.query(
      newThreadQuery,
      sqlParams,
      function (err, result) {
        if (err) throw err;
      }
    );
    console.log("Thread Created!");
    return result;
  } catch (err) {
    return err.stack;
  }
}

export async function createNewPost(postData, threadId) {
  const { text, creatorId } = postData;
  try {
    const sqlParams = [text, threadId, creatorId];
    let newThreadQuery =
      "INSERT INTO forum.post SET text = ?, threadId = ?, creatorId = ?";
    const result = await pool.query(
      newThreadQuery,
      sqlParams,
      function (err, result) {
        if (err) throw err;
      }
    );
    console.log("Post Created!");
    return result;
  } catch (err) {
    return err.stack;
  }
}

export async function deletePost(postId) {
  try {
    const sqlParams = [postId];
    let newThreadQuery = "DELETE FROM forum.post WHERE postId = ?";
    const result = await pool.query(
      newThreadQuery,
      sqlParams,
      function (err, result) {
        if (err) throw err;
      }
    );
    console.log("Post Deleted!");
    return result;
  } catch (err) {
    return err.stack;
  }
}

export async function editPost(postId, postEdit) {
  try {
    const sqlParams = [postEdit, postId];
    let newThreadQuery = "UPDATE forum.post SET text = ? WHERE postId = ?";
    const result = await pool.query(
      newThreadQuery,
      sqlParams,
      function (err, result) {
        if (err) throw err;
      }
    );
    console.log("Post Edited!");
    return result;
  } catch (err) {
    return err.stack;
  }
}

export async function getForumStats() {
  try {
    const postQuery = "SELECT postId FROM forum.post";
    const postResult = await pool.query(postQuery);
    const threadQuery = "SELECT threadId FROM forum.thread";
    const threadResult = await pool.query(threadQuery);
    const userQuery = "SELECT userId FROM forum.users";
    const userResult = await pool.query(userQuery);
    const latestUserQuery =
      "SELECT username FROM forum.users ORDER BY userId DESC LIMIT 1";
    const latestUserResult = await pool.query(latestUserQuery);
    const result = {
      "Threads:": threadResult[0].length,
      "Messages:": postResult[0].length,
      "Total Users:": userResult[0].length,
      "Latest Member:": latestUserResult[0][0].username,
    };
    return result;
  } catch {
    return {
      status: "Error",
      message: "Failed To Get Data",
    };
  }
}

export async function getLatestRegisteredUsers() {
  try {
    const latestUserQuery =
      "SELECT username FROM forum.users ORDER BY userId DESC LIMIT 5";
    const latestUserResult = await pool.query(latestUserQuery);
    return latestUserResult[0];
  } catch {
    return {
      status: "Error",
      message: "Failed To Get Data",
    };
  }
}

export async function getThreadForumPostData(threadId) {
  try {
    const sqlThreadParams = [threadId];
    const threadDataQuery =
      "SELECT creatorId FROM forum.thread WHERE threadId = ?";
    const threadDataResult = await pool.query(threadDataQuery, sqlThreadParams);

    const creatorId = threadDataResult[0][0]["creatorId"];
    const sqlUserParams = [creatorId];
    const userDataQuery = "SELECT username FROM forum.users WHERE userId = ?";
    const userDataResult = await pool.query(userDataQuery, sqlUserParams);

    const repliesDataQuery = "SELECT postId FROM forum.post WHERE threadId = ?";
    const repliesDataResult = await pool.query(
      repliesDataQuery,
      sqlThreadParams
    );

    const latestPostInfoQuery =
      "SELECT postId, text, publishedAt, creatorId FROM forum.post WHERE threadId = ? ORDER BY postId DESC LIMIT 1";
    const latestPostInfoResult = await pool.query(
      latestPostInfoQuery,
      sqlThreadParams
    );

    const latestPosterCreatorId = latestPostInfoResult[0][0]["creatorId"];
    const sqlLatestPostCreatorParams = [latestPosterCreatorId];
    const latestPostCreatorDataQuery =
      "SELECT username FROM forum.users WHERE userId = ?";
    const latestPostCreatorDataResult = await pool.query(
      latestPostCreatorDataQuery,
      sqlLatestPostCreatorParams
    );

    return {
      creatorUsername: userDataResult[0][0]["username"],
      replies: repliesDataResult[0].length,
      latestPostData: {
        postInfo: latestPostInfoResult[0][0],
        creatorInfo: latestPostCreatorDataResult[0][0],
      },
    };
  } catch {
    return {
      status: "Error",
      message: "Failed To Get Data",
    };
  }
}
