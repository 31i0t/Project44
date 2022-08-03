import request from './request';
import endpoints from './endpoints';

const methods = {
  all() {
    return request(endpoints.room.all);
  },
  add(name) {
    return request(endpoints.room.add, { body: JSON.stringify({ name })});
  }
};

export default methods;
