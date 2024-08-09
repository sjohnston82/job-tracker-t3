function padTo2Digits(num: number): string {
  return num.toString().padStart(2, "0");
}

export function formatDate(date: Date) {
  return [
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
    date.getFullYear(),
  ].join("/");
}

export function formatApptDate(dateString: string): string {
  const date = new Date(dateString);

  // Get the components of the date
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Get the hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format the day with the appropriate suffix
  const daySuffix = (day: number): string => {
    if (day > 3 && day < 21) return "th"; // special case for 11th-13th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${month} ${day}${daySuffix(day)}, ${year} ${hours}:${minutes}${ampm}`;
}

export function parseDateString(dateString: string): Date | null {
  // Use the built-in Date constructor to parse the date string
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
}