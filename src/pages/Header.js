import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Menu from '../components/MenuContainer';
import logo from '../assets/logo.png';

const NavigationBar = () => {
   useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   const handleScroll = () => {
   };
   return (
      <>
         <div id="header-wrap">
            <Menu  />
            <Link to="/" id="logo-link">
               <img src={logo} id="logo" width="180" height="100%" alt="WanderFauks Logo" />
            </Link>
         </div>
         <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '100px', background: 'rgba(30, 30, 30, 0.75)', zIndex: 1000 }}></div>
      </>
   );
};

export default NavigationBar;
