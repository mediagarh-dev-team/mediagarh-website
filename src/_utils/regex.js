// Common regex patterns - reuse everywhere (forms, validation etc.)
export const REGEX = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  indianMobile: /^[6-9]\d{9}$/,
  name: /^[a-zA-Z\s.'-]{2,50}$/,
  onlyNumbers: /^\d+$/,
  onlyAlphabets: /^[a-zA-Z\s]+$/,
  pincode: /^[1-9][0-9]{5}$/,
  url: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/,
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
};
