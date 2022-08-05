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
  }
};

export default methods;
