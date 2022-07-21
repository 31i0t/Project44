import axios from 'axios';

export default function request({ method, path }, params = {}) {
  let url = path;
  const { search = {} } = params;
  Object.keys(search).forEach((key) => {
    url = url.replace(`:${key}`, search[key]);
  });
  return axios[method](url);
}
