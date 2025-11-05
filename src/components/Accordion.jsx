import React, { useState } from 'react'
import './styles/Accordion.css'

const Accordion = ({items}) => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleItem = (index) => {
        setOpenIndex(openIndex == index ? null : index);
    }

  return !items || (items.length === 0) ? "No items available" : (
    <>
      {
        items.map((item, index) => (
            <div key={item.id} className='accordion-item'>
                <button className='accordion-title' onClick={() => handleItem(index)}>
                    {item.title}
                    {openIndex === index ? (<i className="ph ph-caret-up right"></i>) : (<i className="ph ph-caret-down right"></i>)}
                </button>
                {openIndex === index && <div className='accordion-content'>
                    <ul>
                        {
                            (item.links).map((subItem) => (
                                <li key={subItem.id}><a href={subItem.url}>{subItem.name}</a></li>
                            ))
                        }
                    </ul>
                </div>}
            </div>
        ))
      }
    </>
  )
}

export default Accordion
