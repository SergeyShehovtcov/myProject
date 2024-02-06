import React, { useState } from 'react';
import { useValidation } from './useValidation';

export const useInput = (
  initialValue: string,
  validations: { isEmpty?: boolean; minLength?: number; maxLength?: number; isEmail?: boolean }
) => {
  const [value, setValue] = useState(initialValue);
  const [fucused, setFocused] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
  };

  return {
    value,
    onChange,
    onBlur,
    fucused,
    setValue,
    setFocused,
    ...valid,
  };
};
