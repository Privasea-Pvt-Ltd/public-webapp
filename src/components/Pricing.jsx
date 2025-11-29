import React from 'react'
import "./styles/Pricing.css"
import Heading from './Heading'
import { pricingList } from "../constants";

const Pricing = () => {
  return (
    <section id='pricing'>
        <div className="imageContainer"></div>
        <Heading
            className="heading"
            tag="Get started with Enkey"
            title="Pay once, use forever"
        />
        <div className='pricingList'>
            {pricingList.map((item) => (
                <div className='pricingBox' key={item.id}>
                    <div className='glass'></div>
                    <h1 className='planName'>{item.planName}</h1>
                    <p className='planText'>{item.text}</p>
                    <p className="product-price">
                        <span className="currency">{item.currency}</span>
                        <span className="amount">{item.amount}</span>
                    </p>
                    <button>{item.buttonText}</button>
                    <ul className='planBenefits'>
                        {
                            (item.benefits).map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                            ))
                        }
                    </ul>
                    <p className='note'>{item.note}</p>
                </div>
            ))}
        </div>
    </section>
  )
}

export default Pricing
