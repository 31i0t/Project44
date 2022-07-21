import request from './request';
import endpoints from './endpoints';

// remove upon API implementation
import { inventoryMock } from './mocks';

// remove upon API implementation
function delay(time, value) {
  return new Promise(function(resolve) {
      setTimeout(resolve.bind(null, value), time)
  });
}

const methods = {
  all() {
    // uncomment upon API implementation
    // return request(endpoints.inventory.all);

    // remove upon API implementation
    return delay(1000, { data: inventoryMock });
  },
  show(inventoryId) {
    // uncomment upon API implementation
    // return request(endpoints.inventory.show, { search: { inventoryId } });

    // remove upon API implementation
    return delay(1000, { data: inventoryMock.filter((i) => i.id === inventoryId) });
  }
};

export default methods;
