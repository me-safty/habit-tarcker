export default function getCurrentDate(dateStr?: string) {
  const date = dateStr 
    ? new Date(dateStr)
    : new Date()
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}