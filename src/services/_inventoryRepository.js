import { inventoryMock } from './_mocks';
import { v4 as uuid } from "uuid";

// remove upon API implementation
function delay(time, value) {
  return new Promise(function(resolve) {
      setTimeout(resolve.bind(null, value), time)
  });
}

const methods = {
  all(roomId) {
    // uncomment upon API implementation
    // return request(endpoints.inventory.all);

    // remove upon API implementation
    return delay(1000, { json: () => inventoryMock.filter((i) => i.roomId === roomId) });
  },
  add(roomId, name) {
    const doc = {
      roomId,
      name,
      id: uuid(),
    }
    inventoryMock.push(doc);
    return  delay(1000, { json: () => doc });
  }
};

export default methods;
