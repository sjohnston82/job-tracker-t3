export const capitalizeFirstLetter = (input: string | undefined): string => {
  const splitWords = input?.split(" ");

  const capitalizedWords: string[] = [];
  

  splitWords?.forEach((word) => {
    word.split("");
    const combined = word[0]?.toUpperCase() + word.substring(1);

    capitalizedWords.push(combined);
  });
  const joined = capitalizedWords.join(" ");

  return joined;
};
