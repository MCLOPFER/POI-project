import { EventEmitter } from "events";
import { assert } from "chai";
import { poiService } from "./poi-service.js";
import { assertSubset } from "../test-utils.js";

import { maggie, woodstock, testPoints } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Point API tests", () => {
  let user = null;

  setup(async () => {
    await poiService.deleteAllPoints();
    await poiService.deleteAllUsers();
    user = await poiService.createUser(maggie);
    woodstock.userid = user._id;
  });

  teardown(async () => {});

  test("create point", async () => {
    const returnedPoint = await poiService.createPoint(woodstock);
    assert.isNotNull(returnedPoint);
    assertSubset(woodstock, returnedPoint);
  });

  test("delete a point", async () => {
    const point = await poiService.createPoint(woodstock);
    const response = await poiService.deletePoint(point._id);
    assert.equal(response.status, 204);
    try {
      const returnedPoint = await poiService.getPoint(point.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Point with this id", "Incorrect Response Message");
    }
  });

  test("create multiple points", async () => {
    for (let i = 0; i < testPoints.length; i += 1) {
      testPoints[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await poiService.createPoint(testPoints[i]);
    }
    let returnedLists = await poiService.getAllPoints();
    assert.equal(returnedLists.length, testPoints.length);
    await poiService.deleteAllPoints();
    returnedLists = await poiService.getAllPoints();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant point", async () => {
    try {
      const response = await poiService.deletePoint("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Point with this id", "Incorrect Response Message");
    }
  });
});