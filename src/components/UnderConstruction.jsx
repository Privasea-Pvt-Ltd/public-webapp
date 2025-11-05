import React from 'react'
import "./styles/UnderConstruction.css"
import { brandLogo } from '../assets';

const UnderConstruction = () => {
  return (
    <>
      <div className="working-container">
            <div className="working-area">
                <div className='logo'><img src={brandLogo} alt="Logo" /></div>
                <div className="content">
                  <h3>Under Construction!</h3>
                  <p>We’re building something amazing. Stay tuned.</p>
                </div>
                {/* <div className="interactive-btn">
                    <button><i className="icon ph-bold ph-user" /></button>
                    <button><i className="icon ph-bold ph-camera" /></button>
                    <button><i className="icon ph-bold ph-image" /></button>
                    <button><i className="icon ph-bold ph-house" /></button>
                </div> */}
            </div>
      </div>
    </>
  )
}

export default UnderConstruction
