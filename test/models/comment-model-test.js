import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPoints, testComments, curracloeBeach, woodstock, woodstockComment, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Comment Model tests", () => {

  let curracloeBeachList = null;

  setup(async () => {
    db.init("mongo");
    await db.pointStore.deleteAllPoints();
    await db.commentStore.deleteAllComments();
    curracloeBeachList = await db.pointStore.addPoint(curracloeBeach);
    for (let i = 0; i < testComments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testComments[i] = await db.commentStore.addComment(curracloeBeachList._id, testComments[i]);
    }
  });

  test("create single comment", async () => {
    const woodstockList = await db.pointStore.addPoint(woodstock);
    const comment = await db.commentStore.addComment(woodstockList._id, woodstockComment)
    assert.isNotNull(comment._id);
    assertSubset (woodstockComment, comment);
  });

  test("get multiple comments", async () => {
    const comments = await db.commentStore.getCommentsByPointId(curracloeBeachList._id);
    assert.equal(comments.length, testComments.length)
  });

  test("delete all comments", async () => {
    const comments = await db.commentStore.getAllComments();
    assert.equal(testComments.length, comments.length);
    await db.commentStore.deleteAllComments();
    const newComments = await db.commentStore.getAllComments();
    assert.equal(0, newComments.length);
  });

  test("get a comment - success", async () => {
    const woodstockList = await db.pointStore.addPoint(woodstock);
    const comment = await db.commentStore.addComment(woodstockList._id, woodstockComment)
    const newComment = await db.commentStore.getCommentById(comment._id);
    assertSubset (woodstockComment, newComment);
  });

  test("delete One Comment - success", async () => {
    await db.commentStore.deleteComment(testComments[0]._id);
    const comments = await db.commentStore.getAllComments();
    assert.equal(comments.length, testPoints.length - 1);
    const deletedComment = await db.commentStore.getCommentById(testComments[0]._id);
    assert.isNull(deletedComment);
  });

  test("get a comment - bad params", async () => {
    assert.isNull(await db.commentStore.getCommentById(""));
    assert.isNull(await db.commentStore.getCommentById());
  });

  test("delete one comment - fail", async () => {
    await db.commentStore.deleteComment("bad-id");
    const comments = await db.commentStore.getAllComments();
    assert.equal(comments.length, testPoints.length);
  });
});