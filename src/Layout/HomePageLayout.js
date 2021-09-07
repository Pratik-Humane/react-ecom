import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

/**
* @author
* @function HomePageLayout
**/

const HomePageLayout = (props) => {
  return(
    <div className="fullHeight">
      <Header />
      {props.children}
      <Footer />
    </div>
   )

 }

export default HomePageLayout