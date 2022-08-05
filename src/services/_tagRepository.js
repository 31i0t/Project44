import { tagsMock } from './_mocks';

// remove upon API implementation
function delay(time, value) {
  return new Promise(function(resolve) { 
      setTimeout(resolve.bind(null, value), time)
  });
}

const methods = {
  all() {
    // uncomment upon API implementation
    // return request(endpoints.tag.all);

    // remove upon API implementation
    return delay(1000, { data: tagsMock });
  },
  show(tagId) {
    // uncomment upon API implementation
    // return request(endpoints.tag.show, { search: { tagId } });

    // remove upon API implementation
    return delay(1000, { data: tagsMock.filter((t) => t.id === tagId) });
  }
};

export default methods;
