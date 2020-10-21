export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const checkInputValidity = (value, rules) => {
  if (!rules) return true;

  if (rules.required && value.trim() === "") return false;

  if (rules.minLength && value.length < rules.minLength) return false;

  if (rules.maxLength && value.length > rules.maxLength) return false;

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!pattern.test(value)) return false;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    if (!pattern.test(value)) return false;
  }

  return true;
};
