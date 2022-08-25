export const RULES = {
  string: (value) => typeof value === 'string',
  number: (value) => Number(value) !== NaN && typeof Number(value) === 'number',
  array: (value) => Array.isArray(value),
  object: (value) => typeof value === 'object' && !RULES.array(value),
  required: (value) => {
    if (RULES.string(value)) {
      return Boolean(value.trim().length);
    }

    if (RULES.number(value)) {
      return;
    }
  },
  min: (value, size) => {
    if (RULES.string(value) || RULES.array(value)) {
      return value.length >= size;
    }

    if (RULES.number(value)) {
      return value >= size;
    }

    if (RULES.object(value)) {
      return Object.keys(value).length >= size;
    }

    return false;
  },
  max: (value, size) => {
    if (RULES.string(value) || RULES.array(value)) {
      return value.length <= size;
    }

    if (RULES.number(value)) {
      return value <= size;
    }

    if (RULES.object(value)) {
      return Object.keys(value).length <= size;
    }

    return false;
  },
};

export const MODIFY = {
  trim: (value) => RULES.string(value) && value.trim(),
  lowercase: (value) => RULES.string(value) && value.toLowerCase(),
};
