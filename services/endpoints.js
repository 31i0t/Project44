const endpoints = {
  room: {
    all: {
      method: 'get',
      path: 'url_here',
    },
    show: {
      method: 'get',
      path: 'url_here/:roomId',
    },
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
