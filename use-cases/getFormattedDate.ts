import { utcToZonedTime } from "date-fns-tz"

export function getFormattedDate(date: string | Date) {
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ]

  let dateObj: Date
  if (typeof date === "string") {
    dateObj = utcToZonedTime(new Date(date), "America/Recife")
  }
  dateObj = utcToZonedTime(date, "America/Recife")

  let dateNumber = String(dateObj.getDate())
  if (dateNumber.length === 1) {
    dateNumber = "0" + dateNumber
  }

  const monthName = months[dateObj.getMonth()]

  return `${dateNumber} ${monthName}`
}
