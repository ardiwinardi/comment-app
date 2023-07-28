export const shortenName = (name: string): string => {
  if (!name) return "";

  const words = name.split(" ");

  const shortenedName = words
    .map((word) => word.substring(0, 1).toUpperCase())
    .join(" ");
  return shortenedName;
};

export const toTitleCase = (str: string): string => {
  if (!str) return "";

  const words = str.split(" ");
  const titleCaseWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  const titleCaseString = titleCaseWords.join(" ");
  return titleCaseString;
};
