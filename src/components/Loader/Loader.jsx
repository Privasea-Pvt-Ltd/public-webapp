import React from 'react'
import loaderCss from "./Loader.module.css"

function Loader() {
  return (
    <div className={loaderCss.loader_container}>
        <div className={loaderCss.spinner}>
          <div className={loaderCss.circle}></div>
          <div className={loaderCss.circle}></div>
          <div className={loaderCss.circle}></div>
        </div>
        <p>Loading</p>
    </div>
  )
}

export default Loader
