import translateServerErrors from "./translateServerErrors.js"

class Fetch {
  static get = async (endpoint) => {
    try {
      const response = await fetch(endpoint)
      if(!response.ok){
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      return body
    } catch (error) {
      console.error(`Error in fetch: ${error}`)
    }
  }

  static post = async (endpoint, body, setErrors=null) =>{
    try {
      const response = await fetch(endpoint, {
        method:"POST",
        headers: new Headers ({
          "Content-Type" : "application/json"
        }),
        body: JSON.stringify(body),
      });
      if(!response.ok){
        if(response.status === 422){
          const responseBody = await response.json()
          const newErrors = translateServerErrors(responseBody.errors)
          setErrors(newErrors)
        } else {
          throw (new Error(`${response.status} ${response.statusText}`))
        }
      }
      const responseBody = await response.json()
      return responseBody
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  static delete = async (endpoint, id) => {
    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({ id })
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          alert(body.message)
        }
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const responseBody = await response.json()
      return responseBody
    } catch (error) {
      return console.error(`Error in fetch: ${error.message}`)
    }
  }

  static update = async (endpoint, body) =>{
    try {
      const response = await fetch(endpoint, {
        method:"PATCH",
        headers: new Headers ({
          "Content-Type" : "application/json"
        }),
        body: JSON.stringify(body),
      });
      if(!response.ok){
        if(response.status === 422){
          const responseBody = await response.json()
        } else {
          throw (new Error(`${response.status} ${response.statusText}`))
        }
      }
      const responseBody = await response.json()
      return responseBody 
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

}

export default Fetch