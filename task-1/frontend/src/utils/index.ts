export function compareTime(dateString1: string, dateString2: string): number {
  const [date1, time1] = dateString1.split("T");
  const [date2, time2] = dateString2.split("T");

  const [day1, month1, year1] = date1.split(/[-\/]/).map(Number);
  const [hours1, minutes1, seconds1] = time1.split(":").map(Number);
  const dateObj1 = new Date(
    year1,
    month1 - 1,
    day1,
    hours1,
    minutes1,
    seconds1 || 0
  );

  const [day2, month2, year2] = date2.split(/[-\/]/).map(Number);
  const [hours2, minutes2, seconds2] = time2.split(":").map(Number);
  const dateObj2 = new Date(
    year2,
    month2 - 1,
    day2,
    hours2,
    minutes2,
    seconds2 || 0
  );

  return dateObj1.getTime() - dateObj2.getTime();
}
//2024-03-21T21:09 -> 03/21/2024T21:09
export function formatTime(
  dateTime: string,
  localeIdentifier?: string
): string {
  const date = new Date(dateTime);
  const time = dateTime.split("T")[1];
  const formattedDate = date.toLocaleDateString(localeIdentifier || "en-GB");
  return `${formattedDate}T${time}`;
}
export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("de-DE").format(amount);
}
