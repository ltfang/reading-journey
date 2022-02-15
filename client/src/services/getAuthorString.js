const getAuthorString = (authorArray) => {
  let authorString = ''
  if (authorArray) {
    authorArray.forEach((author, index) => {
      if (index===authorArray.length-1) {
        authorString += `${author}` 
      } else {
      authorString += `${author}, `
      }
    })  
  }
  return authorString
}

export default getAuthorString