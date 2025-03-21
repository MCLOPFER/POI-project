import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testPoints, testPointDetails, downhillBeach, downhillBeachDetail, testUsers } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";

suite("PointDetail Model tests", () => {

  let list = null;

  setup(async () => {
    db.init("mongo");
    await db.pointStore.deleteAllPoints();
    await db.pointDetailStore.deleteAllPointDetails();
    list = await db.pointStore.addPoint(downhillBeach);
    for (let i = 0; i < testPointDetails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPointDetails[i] = await db.pointDetailStore.addPointDetail(downhillBeachList._id, testPointDetails[i]);
    }
  });

  test("create single pointDetail", async () => {
    const downhillBeachList = await db.pointStore.addPoint(downhillBeach);
    const pointDetail = await db.pointDetailStore.addPointDetail(downhillBeachList._id, downhillBeachDetail)
    assert.isNotNull(pointDetail._id);
    assertSubset (downhillBeachDetail, pointDetail);
  });

  test("get multiple pointDetails", async () => {
    const pointDetails = await db.pointDetailStore.getPointDetailsByPointId(downhillBeachList._id);
    assert.equal(pointDetails.length, testPointDetails.length)
  });

  test("delete all pointDetails", async () => {
    const pointDetails = await db.pointDetailStore.getAllPointDetails();
    assert.equal(testPointDetails.length, pointDetails.length);
    await db.pointDetailStore.deleteAllPointDetails();
    const newPointDetails = await db.pointDetailStore.getAllPointDetails();
    assert.equal(0, newPointDetails.length);
  });

  test("get a pointDetail - success", async () => {
    const downhillBeachList = await db.pointStore.addPoint(downhillBeach);
    const pointDetail = await db.pointDetailStore.addPointDetail(downhillBeachList._id, downhillBeachDetail)
    const newPointDetail = await db.pointDetailStore.getPointDetailById(pointDetail._id);
    assertSubset (downhillBeachDetail, newPointDetail);
  });

  test("delete One PointDetail - success", async () => {
    await db.pointDetailStore.deletePointDetail(testPointDetails[0]._id);
    const pointDetails = await db.pointDetailStore.getAllPointDetails();
    assert.equal(pointDetails.length, testPoints.length - 1);
    const deletedPointDetail = await db.pointDetailStore.getPointDetailById(testPointDetails[0]._id);
    assert.isNull(deletedPointDetail);
  });

  test("get a pointDetail - bad params", async () => {
    assert.isNull(await db.pointDetailStore.getPointDetailById(""));
    assert.isNull(await db.pointDetailStore.getPointDetailById());
  });

  test("delete one pointDetail - fail", async () => {
    await db.pointDetailStore.deletePointDetail("bad-id");
    const pointDetails = await db.pointDetailStore.getAllPointDetails();
    assert.equal(pointDetails.length, testPoints.length);
  });
});
