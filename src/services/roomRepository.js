import request from './request';
import endpoints from './endpoints';

// remove upon API implementation
import { roomsMock } from './mocks';

// remove upon API implementation
function delay(time, value) {
  return new Promise(function(resolve) { 
      setTimeout(resolve.bind(null, value), time)
  });
}

const methods = {
  all() {
    // uncomment upon API implementation
    // return request(endpoints.room.all);

    // remove upon API implementation
    return delay(1000, { data: roomsMock });
  },
  show(roomId) {
    // uncomment upon API implementation
    // return request(endpoints.room.show, { search: { roomId } });

    // remove upon API implementation
    return delay(1000, { data: roomsMock.filter((r) => r.id === roomId) });
  }
};

export default methods;
