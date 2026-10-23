import { REGEX } from "@/_utils/regex";

export const isValidEmail = (value = "") => REGEX.email.test(value.trim());
export const isValidMobile = (value = "") => REGEX.indianMobile.test(value.trim());

export const slugify = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const capitalize = (text = "") =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const truncate = (text = "", length = 100) =>
  text.length > length ? `${text.slice(0, length).trim()}...` : text;

export const formatDate = (date, locale = "en-IN") =>
  new Date(date).toLocaleDateString(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
