import { BASE_URL } from "../utils";

const methods = {
  all(roomId) {
    return fetch(`${BASE_URL}/api/inventory?roomId=${roomId}`, {
      method: 'GET',
    });
  },
  add(roomId, name) {
    return fetch(`${BASE_URL}/api/inventory/add`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId, name })
    });
  },
  update(id, changes) {
    return fetch(`${BASE_URL}/api/inventory/update`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, ...changes })
    });
  },
  delete(id) {
    return fetch(`${BASE_URL}/api/inventory/delete`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id })
    });
  }
};

export default methods;
