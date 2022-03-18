import React from 'react'

const Medal = ({ level }) => {
  let medalClass = `medal-circle medal-circle-${level}`
  let ribbonLeftClass = `medal-ribbon medal-ribbon-left-${level}`
  let ribbonRightClass = `medal-ribbon medal-ribbon-right-${level}`

  let number
  if (level==='three') {
    number = 3
  } else if (level==='five') {
    number = 5
  } else if (level==='seven') {
    number = 7
  }

  return (
    <div className="medal">
      <div className={medalClass}>
        <span>{number}</span>
      </div>
      <div className={ribbonLeftClass}></div>
      <div className={ribbonRightClass}></div>
    </div>
  )
}

export default Medal




