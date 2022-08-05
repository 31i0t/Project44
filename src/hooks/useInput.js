import { useState } from 'react';

const useInput = (defaultValue = '') => {
  const [input, setInput] = useState({
    value: defaultValue,
    error: '',
  });

  const _setInput = ({ value = '', error } = {}) => {
    let msg = ''
    if (error === 'no_empty_name_allowed') {
      msg = 'No empty name allowed';
    } else if (error === 'name_already_exist') {
      msg = 'Name already exist';
    }
    setInput({
      value,
      error: msg,
    });
  }

  return [input, _setInput];
}

export default useInput;
