import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { poiService } from "./poi-service.js";
import { maggie, testUsers } from "../fixtures.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    poiService.clearAuth();
    await poiService.createUser(maggie);
    await poiService.authenticate(maggie);
    await poiService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await poiService.createUser(testUsers[i]);
    }
    await poiService.createUser(maggie);
    await poiService.authenticate(maggie);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await poiService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all user", async () => {
    let returnedUsers = await poiService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await poiService.deleteAllUsers();
    await poiService.createUser(maggie);
    await poiService.authenticate(maggie);
    returnedUsers = await poiService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user", async () => {
    const returnedUser = await poiService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await poiService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {
    await poiService.deleteAllUsers();
    await poiService.createUser(maggie);
    await poiService.authenticate(maggie);
    try {
      const returnedUser = await poiService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});