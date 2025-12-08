import React from 'react'
import pricingCss from "./Pricing.module.css"
import Heading from '../Heading/Heading'
import { pricingList } from "../../constants";

const Pricing = () => {
  return (
    <section id='pricing'>
        <div className="imageContainer"></div>
        <Heading
            tag="Get started with Enkey"
            title="Pay once, use forever"
        />
        <div className={pricingCss.pricingList}>
            {pricingList.map((item) => (
                <div className={pricingCss.pricingBox} key={item.id}>
                    <div className={pricingCss.glass}></div>
                    <h1 className='planName'>{item.planName}</h1>
                    <p className='planText'>{item.text}</p>
                    <p className={pricingCss.product_price}>
                        <span className="currency">{item.currency}</span>
                        <span className="amount">{item.amount}</span>
                    </p>
                    <button>{item.buttonText}</button>
                    <ul className={pricingCss.planBenefits}>
                        {
                            (item.benefits).map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                            ))
                        }
                    </ul>
                    <p className={pricingCss.note}>{item.note}</p>
                </div>
            ))}
        </div>
    </section>
  )
}

export default Pricing
