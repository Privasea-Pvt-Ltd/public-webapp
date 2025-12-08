import React from 'react'
import "./Features.css"
import Heading from '../Heading/Heading'
import { featuresList } from "../../constants";

const Features = () => {
  return (
    <section id='feature'>
        <div className="imageContainer"></div>
        <Heading
            className="heading featuresHeading"
            title="Smart Home Storage for Your Memories"
        />
        <div className='cardList'>
            {featuresList.map((item) => (
                <div className='cardBox' key={item.id}>
                    <div className='glass'></div>
                    <h1>{item.title}</h1>
                    <p className='cardText'>{item.text}</p>
                    <div className="cardOption">
                        <div className="cardIcon">{item.icon}</div>
                        <div className="cardLink">
                            <a href={item.link}>Explore More</a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
  )
}

export default Features
