import React from "react"

const SingleError = ({ error }) => {
  if (error.trim() === "") {
    return ""
  }
  return (
    <div className="callout alert">{error}</div>
  )
}

export default SingleError