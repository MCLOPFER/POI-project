import { assert } from "chai";
import { EventEmitter } from "events";
import { db } from "../../src/models/db.js";
import { testPoints, woodstock } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

EventEmitter.setMaxListeners(25);

suite("Point Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.pointStore.deleteAllPoints();
    for (let i = 0; i < testPoints.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPoints[i] = await db.pointStore.addPoint(testPoints[i]);
    }
  });

  test("create a point", async () => {
    const point = await db.pointStore.addPoint(woodstock);
    assertSubset(woodstock, point);
    assert.isDefined(point._id);
  });

  test("delete all points", async () => {
    let returnedPoints = await db.pointStore.getAllPoints();
    assert.equal(returnedPoints.length, 3);
    await db.pointStore.deleteAllPoints();
    returnedPoints = await db.pointStore.getAllPoints();
    assert.equal(returnedPoints.length, 0);
  });

  test("get a point - success", async () => {
    const point = await db.pointStore.addPoint(woodstock);
    const returnedPoint = await db.pointStore.getPointById(point._id);
    assertSubset(woodstock, point);
  });

  test("delete One Playist - success", async () => {
    const id = testPoints[0]._id;
    await db.pointStore.deletePointById(id);
    const returnedPoints = await db.pointStore.getAllPoints();
    assert.equal(returnedPoints.length, testPoints.length - 1);
    const deletedPoint = await db.pointStore.getPointById(id);
    assert.isNull(deletedPoint);
  });

  test("get a point - bad params", async () => {
    assert.isNull(await db.pointStore.getPointById(""));
    assert.isNull(await db.pointStore.getPointById());
  });

  test("delete One Point - fail", async () => {
    await db.pointStore.deletePointById("bad-id");
    const allPoints = await db.pointStore.getAllPoints();
    assert.equal(testPoints.length, allPoints.length);
  });
});
