import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { fadeIn, fadeInRight, fadeInUp } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import { gsap } from 'gsap';
import Loading from 'react-progress-bar-plus'
import { Row, Container, Col } from 'react-bootstrap';


const MenuContainer = () => {
   const [menuOn, setMenuOn] = useState(false);
   const [showLoading, setShowLoading] = useState(false);

   const menuItemsRef = useRef(null);
   const logoLinkRef = useRef(null);
   const menuOpenRef = useRef(null);
   const menuLine1Ref = useRef(null);
   const menuLine2Ref = useRef(null);

   const closeMenu = () => {
      setMenuOn(false);
      setShowLoading(true);
      setTimeout(() => {
         setShowLoading(false);
      }, 500);
      handleMenuClick();
   };

   const renderTextContent = () => {
      return (
         <div className="about">
            <h5 style={styles.fadeInAbout1}>About</h5>
            <p style={styles.fadeInAbout1}>
               Wunderfauks is an integrated creative agency focusing on new and innovative experiences. From the likes of creative
               expression to a campaign execution, communication and creative implementation, Wunderfauks provides tailored bulls-eye
               solutions that focus on results over activities.
            </p>
            <p style={styles.fadeInAbout2}>
               With digital as our strong suit, we have a dynamic team comprising of multi-disciplinary individuals with their own think
               tanks of interesting ideas and concepts to suit any need, logic and aspiration.
            </p>
         </div>
      );
   };
   const renderSocial = () => {
         return (
            <StyleRoot>
               <div >
                  <Row className={'menu-soc-med'} >
                     <Col md={{ span: 2 }} className="col-md-offset-6 col-xs-4" >
                        <div style={styles.fadeInSocial1}>
                           <a href="https://www.facebook.com/Wunderfauks/" target="_blank" rel="noopener noreferrer"
                           >
                              <div className="facebook" />
                           </a>
                        </div>
                     </Col>

                     <Col md={2} className="col-xs-4" >
                        <div style={styles.fadeInSocial2}>
                           <a href="https://www.instagram.com/wunderfauks/" target="_blank" rel="noopener noreferrer"
                           >
                              <div className="instagram" />
                           </a>
                        </div>
                     </Col>

                     <Col md={2} className="col-xs-4" >
                        <div style={styles.fadeInSocial3}>
                           <a href="https://sg.linkedin.com/company/wunderfauks" target="_blank" rel="noopener noreferrer"
                           >
                              <div className="linkedin" />
                           </a>
                        </div>
                     </Col>
                  </Row>
               </div>
            </StyleRoot>
         );
      }
   
   const renderLinks = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth > 767) {
         return (
            <StyleRoot>
               <div style={styles.fadeIns}>
                  <div style={styles.fadeInUp1}>
                     <Link to="/work" onClick={closeMenu}>
                        Work
                     </Link>
                  </div>
                  <div style={styles.fadeInUp12}>
                     <Link to="/services" onClick={closeMenu}>
                        Services
                     </Link>
                  </div>
                  <div style={styles.fadeInUp2}>
                     <Link to="/services#approach" onClick={closeMenu}>
                        Approach
                     </Link>
                  </div>
                  <div style={styles.fadeInUp3}>
                     <Link to="/careers" onClick={closeMenu}>
                        Careers
                     </Link>
                  </div>
                  <div style={styles.fadeInUp4}>
                     <a href="#" className="contact" onClick={closeMenu}>
                        Contact
                     </a>
                  </div>
               </div>
            </StyleRoot>
         );
      } else {
         return (
            <StyleRoot>
               <div style={styles.fadeIns}>
                  <div style={styles.fadeInUp0}>
                     <Link to="/about" onClick={closeMenu}>
                        About
                     </Link>
                  </div>
                  <div style={styles.fadeInUp1}>
                     <Link to="/work" onClick={closeMenu}>
                        Work
                     </Link>
                  </div>
                  <div style={styles.fadeInUp12}>
                     <Link to="/services" onClick={closeMenu}>
                        Services
                     </Link>
                  </div>
                  <div style={styles.fadeInUp2}>
                     <Link to="/services#approach" onClick={closeMenu}>
                        Approach
                     </Link>
                  </div>
                  <div style={styles.fadeInUp3}>
                     <Link to="/careers" onClick={closeMenu}>
                        Careers
                     </Link>
                  </div>
                  <div style={styles.fadeInUp4}>
                     <Link to="/about#contact" className="contact" onClick={closeMenu}>
                        Contact
                     </Link>
                  </div>
               </div>
            </StyleRoot>
         );
      }
   };

   const handleMenuClick = () => {
      if (menuOn) {
         setMenuOn(false);
         gsap.to(menuItemsRef.current, 0.3, {
            opacity: 0, onComplete: () => {
               menuItemsRef.current.style.display = 'none';
            }
         });
         gsap.to(logoLinkRef.current, 0.1, { opacity: 1 });

         if (window.innerWidth < 767) {
            gsap.to(menuOpenRef.current, 0.3, {
               width: '0px',
               height: '0px',
               right: '40px',
               top: '32px',
               ease: 'Power4.easeInOut'
            });
         } else {
            gsap.to(menuOpenRef.current, 0.3, {
               width: '0px',
               height: '0px',
               right: '85px',
               top: '50px',
               ease: 'Power4.easeInOut'
            });
         }

         gsap.to(menuLine1Ref.current, 0.1, {
            rotation: 0,
            top: '20px',
         });

         gsap.to(menuLine2Ref.current, 0.1, {
            rotation: 0,
            top: '30px',
         });

         menuLine1Ref.current.classList.remove('menu-line-1a');
         document.body.style.overflow = 'auto';
      } else {
         document.body.style.overflow = 'hidden';
         setMenuOn(true);
         const windowWidth = window.innerWidth;
         const windowHeight = window.innerHeight;
         let length = 0;

         if (windowWidth > windowHeight) {
            length = windowWidth;
         } else {
            length = windowHeight;
         }

         length *= 2.5;
         const center = length / 2 + 'px';

         gsap.to(menuOpenRef.current, 0.6, {
            width: `${length}px`,
            height: `${length}px`,
            right: `-=${center}`,
            top: `-=${center}`,
            ease: 'Power4.easeInOut',
         });

         setTimeout(() => {
            menuItemsRef.current.style.display = 'block';
            gsap.to(menuItemsRef.current, 0.2, { opacity: 1 });
            gsap.to(logoLinkRef.current, 0.1, { opacity: 0 });
         }, 200);

         menuLine1Ref.current.classList.add('menu-line-1a');
         gsap.to(menuLine1Ref.current, 0.01, {
            rotation: 45,
            top: '25px',
         });

         gsap.to(menuLine2Ref.current, 0.01, {
            rotation: -45,
            top: '25px',
         });
      }
   };

   return (
      <StyleRoot>
         {showLoading && (
            <div className="loader">
               <Loading percent={0} spinner={false} autoIncrement={true} intervalTime={1} />
            </div>
         )}
         <div id="menu-div">
            <div id="menu-button" onClick={handleMenuClick}>
               <div id="menu-line-1" ref={menuLine1Ref} />
               <div id="menu-line-2" ref={menuLine2Ref} />
            </div>
         </div>
         <div id="menu-open" ref={menuOpenRef}></div>
         <div id="menu-items" ref={menuItemsRef}>
            <Container fluid={true} className="menu-contact-div">
               {renderTextContent()}
            </Container>
            <div className="TopBar">{renderLinks()}</div>
            {renderSocial()}
            <div id="menu-footer">
               <p style={{ float: 'left' }}>&copy; {new Date().getFullYear()}</p>
               <p style={{ float: 'right' }}>An Integrated Creative Agency.</p>
            </div>
         </div>
      </StyleRoot>
   );
};

export default MenuContainer;

const styles = {
   fadeInRight: {
      animation: 'x 1s ease',
      animationName: Radium.keyframes(fadeInRight, 'fadeInRight'),
   },
   fadeInOnly: {
      animation: 'x 2s ease',
      animationName: Radium.keyframes(fadeIn, 'fadeIn'),
   },
   fadeInAbout1: {
      animation: 'x 0.4s',
      animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
   },
   fadeInAbout2: {
      animation: 'x 0.8s',
      animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
   },
   fadeInSocial: {
      animation: 'x 0.8s ease',
      animationName: Radium.keyframes(fadeInRight, 'fadeInRight'),
   },
   fadeInSocial1: {
      animation: 'x 0.6s ease',
      animationName: Radium.keyframes(fadeInRight, 'fadeInRight'),
   },
   fadeInSocial2: {
      animation: 'x 1.5s ease',
      animationName: Radium.keyframes(fadeInRight, 'fadeInRight'),
   },
   fadeInSocial3: {
      animation: 'x 2.4s ease',
      animationName: Radium.keyframes(fadeInRight, 'fadeInRight'),
   },
   fadeIns: {
      animation: 'x 0.9s ease',
      animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
   },
   fadeInUp0: {
      animation: 'x 0.8s ease',
      animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
   },
   fadeInUp1: {
      animation: 'x 1s ease',
      animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
   },
   fadeInUp12: {
      animation: 'x 1.3s ease',
      animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
   },
   fadeInUp2: {
      animation: 'x 1.6s ease',
      animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
   },
   fadeInUp3: {
      animation: 'x 1.9s ease',
      animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
   },
   fadeInUp4: {
      animation: 'x 2.1s ease',
      animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
   }
};
