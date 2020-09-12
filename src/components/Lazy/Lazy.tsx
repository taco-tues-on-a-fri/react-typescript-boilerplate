import React, { FC, Fragment } from 'react'
import './styles.css'

const LazyComponent:  FC = () => {
  return (
    <Fragment>
      <h1 className="title">Lazy Component</h1>
      <div>🌮taco-tues-on-a-fri</div>
    </Fragment>
  )
}

export default LazyComponent