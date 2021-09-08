import React from 'react'
import ShopMen from '../../assets/shopMens.jpg';
import shopWomens from '../../assets/shopWomens.jpg';

import './style.scss';

export default function Directory() {
  return (
    <div className="directory">
      <div className="wrap">
        <div
          className="item"
          style={{
              backgroundImage: `url(${shopWomens})`
          }}>
          <a href='#'>Shop Womens</a>
        </div>
        <div
          className="item"
          style={{
              backgroundImage: `url(${ShopMen})`
          }}>
          <a href='#'>Shop Mens</a>
        </div>
      </div>
      
    </div>
  )
}
