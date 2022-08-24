// docs: https://vercel.com/docs/concepts/projects/environment-variables
export const BASE_URL =
  typeof window !== 'undefined'
    ? window.location.origin
    : process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000";



export const trimSpaces = (str = '') => str.trim()
  .replace(new RegExp(String.fromCharCode(160), 'g'), '')
  .replace(/\s+/g, ' ');

export const validateInput = (value = '', values = []) => {
  const txt = trimSpaces(value.toLowerCase());
  let error = '';
  if (txt === '') {
    error = 'no_empty_name_allowed';
  } else if (values.some((t) => trimSpaces(t).toLowerCase() === txt)) {
    error = 'name_already_exist';
  }
  return {
    value,
    error
  };
};


