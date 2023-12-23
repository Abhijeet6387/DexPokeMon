import { progressColor } from "./colors";
export const progressBarColor = (color) => {
  if (color <= 25) return progressColor["red"];
  if (color > 25 && color <= 65) return progressColor["orange"];
  if (color > 65) return progressColor["green"];
};

export const capitalizeFirstLetter = (str) => {
  let capitalized = "";
  if (str) {
    capitalized = str.charAt(0).toUpperCase() + str.slice(1);
  }

  return capitalized;
};