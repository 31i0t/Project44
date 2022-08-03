export default function request({ method, headers, path }, params = {}) {
  const { body } = params;

  return fetch(path, {
    method,
    headers,
    body,
  });
}
