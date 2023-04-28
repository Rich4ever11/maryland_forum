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

    //get the thread count & message count for each category
    let counter = 0;
    for (let i = 4; i <= 28; i += 4) {
      const sportId = i - 3;
      const entertainmentId = i - 2;
      const miscId = i - 1;
      const generalId = i;
      var messageCount = 0;

      const threadCountQuery = `SELECT threadId FROM forum.thread WHERE forumId = ? OR forumId = ?  OR forumId = ?  OR forumId = ?`;
      const threadCountSQLParams = [
        sportId,
        entertainmentId,
        miscId,
        generalId,
      ];
      const threadCount = await pool.query(
        threadCountQuery,
        threadCountSQLParams
      );

      for (let j = 0; j < threadCount[0].length; j++) {
        const postCountQuery = `SELECT postId FROM forum.post WHERE threadId = ?`;
        const postCountParams = [threadCount[0][j].threadId];
        const queryResponse = await pool.query(postCountQuery, postCountParams);
        messageCount += queryResponse[0].length;
      }
      categoryData[0][counter]["threadCount"] = threadCount[0].length;
      //get the message count in the category
      categoryData[0][counter]["messageCount"] = messageCount;
      //sets the forumId for each category of discussion within the forum
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
      const threadListFromForumQuery = `SELECT * FROM forum.thread WHERE forumId=?`;
      const threadListFromForumParams = [forumId];
      const threadsFromForumId = await pool.query(
        threadListFromForumQuery,
        threadListFromForumParams
      );
      for (var i = 0; i < threadsFromForumId[0].length; i++) {
        const currentThread = threadsFromForumId[0][i];
        const creatorQuery = `SELECT username, avatar, userId FROM forum.users WHERE userId=?`;
        const creatorSQLParams = [currentThread.creatorId];
        const creatorInfo = await pool.query(creatorQuery, creatorSQLParams);
        threadsFromForumId[0][i] = {
          ...currentThread,
          ...creatorInfo[0],
        };
      }
      return threadsFromForumId[0];
    } else if (threadId !== undefined) {
      const threadQuery = `SELECT * FROM forum.thread WHERE threadId=?`;
      const threadSQLParams = [threadId];
      const threadData = await pool.query(threadQuery, threadSQLParams);
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
      const threadQuery = `SELECT * FROM forum.thread WHERE threadId=?`;
      const threadParams = [threadId];
      const threadData = await pool.query(threadQuery, threadParams);

      const threadCreatorQuery = `SELECT username FROM forum.users WHERE userId=?`;
      const threadCreatorParams = [threadData[0][0]["creatorId"]];
      const threadCreatorData = await pool.query(
        threadCreatorQuery,
        threadCreatorParams
      );
      threadData[0][0].creatorUsername = threadCreatorData[0][0]["username"];

      //obtains all the data for each post
      const postQuery = `SELECT * FROM forum.post WHERE threadId=?`;
      const postSQLParams = [threadId];
      const postResultList = await pool.query(postQuery, postSQLParams);
      var postList = [];
      var contributors = [];
      for (const postData of postResultList[0]) {
        const postCreatorQuery = `SELECT username, registeredAt FROM forum.users WHERE userId=?`;
        const userPostQuery = `SELECT postId FROM forum.post WHERE creatorId=?`;
        const creatorSQLParams = [postData["creatorId"]];
        const postCreatorData = await pool.query(
          postCreatorQuery,
          creatorSQLParams
        );
        const userPostCount = await pool.query(userPostQuery, creatorSQLParams);

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

export async function signUpUser(
  username,
  email,
  name,
  avatar = "NONE",
  password
) {
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
    let deletePostQuery = "DELETE FROM forum.post WHERE postId = ?";
    const result = await pool.query(
      deletePostQuery,
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

export async function deleteThread(threadId) {
  try {
    const sqlParams = [threadId];
    let deleteThreadQuery = "DELETE FROM forum.thread WHERE threadId = ?";
    const threadDeleteResult = await pool.query(
      deleteThreadQuery,
      sqlParams,
      function (err, result) {
        if (err) throw err;
      }
    );
    let deletePostsQuery = "DELETE FROM forum.post WHERE threadId = ?";
    const postDeleteResult = await pool.query(
      deletePostsQuery,
      sqlParams,
      function (err, result) {
        if (err) throw err;
      }
    );
    result = {
      ...threadDeleteResult,
      ...postDeleteResult,
    };
    console.log("Post And Thread Deleted!");
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
      "SELECT username FROM forum.users ORDER BY userId DESC LIMIT 10";
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

export async function getLatestPost(sections) {
  try {
    const sqlParams = sections;
    const latestUserPostQuery =
      "SELECT postId, text, publishedAt, creatorId FROM forum.post WHERE threadId IN (SELECT threadId FROM forum.thread WHERE forumId = ? OR forumId = ? OR forumId = ? OR forumId = ?) ORDER BY publishedAt DESC LIMIT 1";
    const latestUserPostResult = await pool.query(
      latestUserPostQuery,
      sqlParams,
      function (err) {
        if (err) throw err;
      }
    );
    if (latestUserPostResult[0][0]?.creatorId) {
      const creatorSQLParams = [latestUserPostResult[0][0].creatorId];
      const latestUserQuery =
        "SELECT username FROM forum.users WHERE userId = ?";
      const latestUserResult = await pool.query(
        latestUserQuery,
        creatorSQLParams,
        function (err) {
          if (err) throw err;
        }
      );
      const result = {
        ...latestUserPostResult[0][0],
        ...latestUserResult[0][0],
      };
      return result;
    } else {
      const result = {
        ...latestUserPostResult[0][0],
      };
      return result;
    }
  } catch {
    return {
      status: "Error",
      message: "Failed To Get Data",
    };
  }
}

export async function checkUsername(username) {
  try {
    const sqlCheckUserParams = [username];
    const checkUsernameQuery =
      "SELECT userId FROM forum.users WHERE username = ?";
    const checkUsernameResult = await pool.query(
      checkUsernameQuery,
      sqlCheckUserParams
    );
    return checkUsernameResult[0];
  } catch {
    return { result: "Error" };
  }
}
