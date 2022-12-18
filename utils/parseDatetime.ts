import { parse } from "date-fns"

function parseDatetime(timestamp: string) {
  if (timestamp.length > 10) {
    return new Date(timestamp)
  }
  return parse(timestamp, "dd/MM/yyyy", new Date())
}

export default parseDatetime
