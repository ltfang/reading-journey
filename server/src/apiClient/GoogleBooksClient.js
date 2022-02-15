import got from "got"

class GoogleBooksClient { 
    
  static async getBooks(searchTerms) {
    try {
      const queryStringEnd = searchTerms.replace(" ","+")
      const url = `https://www.googleapis.com/books/v1/volumes?q=${queryStringEnd}`
      const apiResponse = await got(url)
      const responseBody = apiResponse.body
      return responseBody
    } catch (error) {
      return { error: error.message }
    }
  }
}



export default GoogleBooksClient