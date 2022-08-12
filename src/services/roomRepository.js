import { BASE_URL } from "../utils";

const methods = {
  all() {
    return fetch(`${BASE_URL}/api/rooms`, {
      method: 'GET',
    });
  },
  add(name) {
    return fetch(`${BASE_URL}/api/rooms/add`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name })
    });
  },
  update(id, changes) {
    return fetch(`${BASE_URL}/api/rooms/update`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, ...changes })
    });
  },
  delete(id) {
    return fetch(`${BASE_URL}/api/rooms/delete`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id })
    });
  }
};

export default methods;
