import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { poiService } from "./poi-service.js";
import { maggie, woodstock, testPoints, testComments, woodstockComment } from "../fixtures.js";

suite("Comment API tests", () => {
  let user = null;
  let pointComments = null;

  setup(async () => {
    poiService.clearAuth();
    user = await poiService.createUser(maggie);
    await poiService.authenticate(maggie);
    await poiService.deleteAllPoints();
    await poiService.deleteAllComments();
    await poiService.deleteAllUsers();
    user = await poiService.createUser(maggie);
    await poiService.authenticate(maggie);
    woodstock.userid = user._id;
    pointComments = await poiService.createPoint(woodstock);
  });

  teardown(async () => {});

  test("create comment", async () => {
    const returnedComment = await poiService.createComment(pointComments._id, woodstockComment);
    assertSubset(woodstockComment, returnedComment);
  });

  test("create Multiple comments", async () => {
    for (let i = 0; i < testComments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await poiService.createComment(pointComments._id, testComments[i]);
    }
    const returnedComments = await poiService.getAllComments();
    assert.equal(returnedComments.length, testComments.length);
    for (let i = 0; i < returnedComments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const comment = await poiService.getComment(returnedComments[i]._id);
      assertSubset(comment, returnedComments[i]);
    }
  });

  test("Delete CommentApi", async () => {
    for (let i = 0; i < testComments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await poiService.createComment(pointComments._id, testComments[i]);
    }
    let returnedComments = await poiService.getAllComments();
    assert.equal(returnedComments.length, testComments.length);
    for (let i = 0; i < returnedComments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const comment = await poiService.deleteComment(returnedComments[i]._id);
    }
    returnedComments = await poiService.getAllComments();
    assert.equal(returnedComments.length, 0);
  });

  test("denormalised point", async () => {
    for (let i = 0; i < testComments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await poiService.createComment(pointComments._id, testComments[i]);
    }
    const returnedPoint = await poiService.getPoint(pointComments._id);
    assert.equal(returnedPoint.comments.length, testComments.length);
    for (let i = 0; i < testComments.length; i += 1) {
      assertSubset(testComments[i], returnedPoint.comments[i]);
    }
  });
});