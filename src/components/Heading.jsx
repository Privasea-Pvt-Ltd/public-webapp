import React from 'react'
import "./styles/Heading.css"
const Heading = ({ className, title, text, tag }) => {
  return (
    <div className={`${className}`}>
      {tag && <div className='tag'>{tag}</div>}
      {title && <h2 className='title'>{title}</h2>}
      {text && <p className='text'>{text}</p>}
    </div>
  )
}

export default Heading
