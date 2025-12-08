import React, { useState } from 'react'
import accordionCss from './Accordion.module.css'

const Accordion = ({items, footerCss=""}) => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleItem = (index) => {
        setOpenIndex(openIndex == index ? null : index);
    }

  return !items || (items.length === 0) ? "No items available" : (
    <>
      {
        items.map((item, index) => (
            <div key={item.id} className={footerCss.accordion_item}>
                <button className={accordionCss.accordion_title} onClick={() => handleItem(index)}>
                    {item.title}
                    {openIndex === index ? (<i className={`ph ph-caret-up ${accordionCss.right}`}></i>) : (<i className={`ph ph-caret-down ${accordionCss.right}`}></i>)}
                </button>
                {openIndex === index && <div className={accordionCss.accordion_content}>
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
