import React from 'react'
import underConstructionCss from "./UnderConstruction.module.css"
import { assets } from '../../assets/assets.js';

const UnderConstruction = () => {
  return (
    <>
      <div className={underConstructionCss.working_container}>
            <div className={underConstructionCss.working_area}>
                <div className={underConstructionCss.logo}><img src={assets.brandLogo} alt="Logo" /></div>
                <div className={underConstructionCss.content}>
                  <h3>Under Construction!</h3>
                  <p>We’re building something amazing. Stay tuned.</p>
                </div>
            </div>
      </div>
    </>
  )
}

export default UnderConstruction
