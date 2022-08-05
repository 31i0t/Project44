import { roomsMock, inventoryMock } from './_mocks';
import { v4 as uuid } from "uuid";

// remove upon API implementation
function delay(time, value) {
  return new Promise(function(resolve) {
      setTimeout(resolve.bind(null, value), time)
  });
}

const methods = {
  all() {
    // fake relation
    const response = roomsMock.map(r => {
      r.inventory = inventoryMock.filter(i => i.roomId === r.id);
      return r;
    });
    return delay(1000, { json: () => response });
  },

  add(name) {
    const doc = {
      name,
      id: uuid(),
      inventory: [],
    }
    roomsMock.push(doc);
    return  delay(1000, { json: () => doc });
  }
};

export default methods;
