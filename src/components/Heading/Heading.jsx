import React from 'react'
import headingCss from "./Heading.module.css"
const Heading = ({ className="", title, text, tag }) => {
  return (
    <div className={`${headingCss.heading} ${className}`}>
      {tag && <div className={headingCss.tag}>{tag}</div>}
      {title && <h2 className={headingCss.title}>{title}</h2>}
      {text && <p className={headingCss.text}>{text}</p>}
    </div>
  )
}

export default Heading
