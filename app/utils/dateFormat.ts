export function formatDate(dateString: string) {
  const [datePart, timePart] = dateString.split(' ')

  const [day, month, year] = datePart.split('.')

  const [hours, minutes] = timePart.split(':')

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const formatedDate = new Date(`20${year}`, month - 1, day, hours, minutes)

  return formatedDate
}
