import React from 'react'
import './menu-item.styles.scss'

const MenuItem = ({ title, imageUrl }) => (
    <div style={{
        backgroundImage: `url(${imageUrl})`
    }}>

    <div className='menu-item'> 
        <div className='content'>
            <h1 className='title'> {title} </h1>
            <span className='subtitle'> Shop Now</span>
        </div>
    </div> 
 </div>
)

export default MenuItem