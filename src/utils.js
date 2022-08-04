// docs: https://vercel.com/docs/concepts/projects/environment-variables
export const BASE_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";



export const trimSpaces = (str = '') => str.trim()
  .replace(new RegExp(String.fromCharCode(160), 'g'), '')
  .replace(/\s+/g, ' ');

export const validateInput = (text = '', texts = []) => {
  const txt = trimSpaces(text.toLowerCase());
  if (txt === '') return 'no_empty_name_allowed';
  if (texts.some((t) => trimSpaces(t).toLowerCase() === txt)) return 'name_already_exist';
  return '';
};


