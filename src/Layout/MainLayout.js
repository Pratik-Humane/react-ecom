import React from 'react';
import Footer from '../components/Footer';
import Header from "../components/Header";

export default function MainLayout(props) {
  return (
    <div>
      <Header {...props}/>
      <div className="main">
        {props.children}
      </div>
      <Footer />
    </div>
  )
}
