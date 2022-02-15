const convertDateString = (dateString) => {
  const year = dateString.substring(0,4)
  const month = dateString.substring(4, 6)
  const day = dateString.substring(6, 8)
  const date = `${year}-${month}-${day}`
  return date
}

export default convertDateString

