import { BASE_URL } from "../utils";

const endpoints = {
  room: {
    all: {
      method: 'GET',
      path: `${BASE_URL}/api/rooms`,
    },
    add: {
      method: 'POST',
      path: `${BASE_URL}/api/rooms/add`,
      headers: {
        "Content-Type": "application/json",
      },
    }
  },
  tag: {
    all: {
      method: 'get',
      path: 'url_here',
    },
    show: {
      method: 'get',
      path: 'url_here/:tagId',
    },
  },
  inventory: {
    all: {
      method: 'get',
      path: 'url_here',
    },
    show: {
      method: 'get',
      path: 'url_here/:inventoryId',
    },
  },
}

export default endpoints;
