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

export const transformStageOfApplication = (
  stageOfApplication: number | null,
) => {
  switch (stageOfApplication) {
    case 0:
      return "Application Submitted";
    case 1:
      return "Recruiter Phone Interview";
    case 2:
      return "Technical Phone Interview";
    case 3:
      return "Onsite/Online Interview";
    case 4:
      return "Take-home Evaluation";
    case 5:
      return "Offer Received!";
    default:
      return "Application Submitted";
  }
};
