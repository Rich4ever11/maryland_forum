const { createPool } = require("mysql2/promise");
const crypto = require("crypto");
const salt = "SMD232MSC942MSDDS";

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
    let data = {};
    if (parseInt(threadId) >= 0) {
      const threadData = await pool.query(
        `SELECT * FROM forum.thread WHERE threadId=${threadId}`
      );
      const postList = await pool.query(
        `SELECT * FROM forum.post WHERE threadId=${threadId}`
      );
      data = {
        threadData: threadData[0][0],
        postData: postList[0],
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
