// import React, { Component } from 'react';
// import { fadeInUp, fadeIn, fadeInUpBig } from 'react-animations';
// import Radium, { StyleRoot } from 'radium';
// import { TweenMax, TimelineMax, TimelineLite } from 'gsap';
// // import PointsAnimation from './PointsAnimation';
// import WorkGrid from '../components/WorkGrid'
// // import downArrow from '../assets/down.png';
// import scrollToComponent from 'react-scroll-to-component';
// // import ShreddedText from './ShreddedText';--legacy-peer-deps
// import axios from 'axios';
// import { Col, Row, Container, Image } from 'react-bootstrap';
// import { Fade } from 'react-reveal';
// import { Link } from 'react-router-dom';
// import ResourceUrl from '../resource';
// import $ from 'jquery'
// import {Helmet} from 'react-helmet'
// import Loading from 'react-progress-bar-plus'
// import NoScript from 'react-noscript';
// import {CSSPlugin} from 'gsap'


// export default class Home extends Component {
//    constructor(props) {
//       super(props);
//       this.state = {
//          increment: 1,
//          transitionTime: 0.5,
//          slogansDelayTime: 1.4,
//          oldSlogan: -1,
//          currentSlogan: 0,
//          mobile: false,
//          pMouseX: 0,
//          pMouseY: 0,
//          pMouseDown: false,
//          pMouseUp: false,
//          showBanner: true,
//          displayArrows: false,
//          pointsZoom: false,
//          canvasAway: false,
//          work: [],
//          divHeight: 0,
//          showLoading: true,
//          loadingStatus: 0,
//          render_work: false,
//       };
//       this.handleSpacebar = this.handleSpacebar.bind(this);
//       this.switchSlogan = this.switchSlogan.bind(this);
//       this.handleMobile = this.handleMobile.bind(this);
//       this.triggerArrows = this.triggerArrows.bind(this);
//       this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
//       this.createCircle = this.createCircle.bind(this);
//       this.motionHandler = this.motionHandler.bind(this);
//    }
//    componentWillMount() {
//       this.handleMobile();
//       this.updateWindowDimensions();
//       window.addEventListener('resize', this.updateWindowDimensions);
//    }
//    componentDidMount() {

//       setTimeout(function () {
//          window.scrollTo(0, 0);
//       }, 400);
//       window.addEventListener('keydown', this.handleSpacebar);
//       window.addEventListener('resize', this.handleMobile);

//       this.windowHalfX = window.innerWidth / 2;
//       this.windowHalfY = window.innerHeight / 2;
//       window.addEventListener('scroll', this.triggerArrows);

//       let windowWidth = window.innerWidth
//       let windowHeight = window.innerHeight
//       let size = (windowWidth > windowHeight) ? windowHeight : windowWidth
//       if(windowWidth < 600){
//          this.radius = (windowWidth/2) - 20
//       }else  {
//          this.radius = (size/3)
//       }
//       axios
//       .get(ResourceUrl.url + 'work')
//       .then(res => {
//          const work = res.data;
//          this.setState({
//             work: work,
//             loadingStatus: 40
//          });
//          let _this = this
//          setTimeout(function(){
//             _this.setState({
//                loadingStatus: 100,
//                render_work: true
//             });
//             setTimeout(function(){
//                _this.switchSlogan();
//                _this.createCircle();
//                _this.initQuote();
//                _this.setState({
//                   showLoading: false,
//                })
//                $("#loadingScreen1").fadeOut(1500);
//             }, 200);
//          }, 2000);
//       })
//       if(window.DeviceMotionEvent){
//          window.addEventListener("devicemotion", this.motionHandler, false);
//       }
//    }
//    componentWillUnmount() {
//       window.removeEventListener('scroll', this.triggerArrows);
//       window.removeEventListener('resize', this.updateWindowDimensions);
//       window.removeEventListener('keydown', this.handleSpacebar);
//    }

//    motionHandler(event){
//       const {pointsZoom} = this.state

//       if(pointsZoom){
//          this.setState({
//             pMouseX: event.accelerationIncludingGravity.x * 30,
//             pMouseY: event.accelerationIncludingGravity.y * 30
//          })
//       }
//    }

//    updateWindowDimensions() {
//       let windowWidth = window.innerWidth
//       let divHeight = 0
//       if(windowWidth > 1000){
//          divHeight = (windowWidth/3) * (9/16)
//       }else{
//          divHeight = (windowWidth) * (9/16)
//       }
//       this.setState({divHeight});
//    }
//    initQuote () {
//       const tmax_optionsGlobal = {
//          repeat: 0,
//          repeatDelay: 0.318,
//          yoyo: true
//       };
//       CSSPlugin.useSVGTransformAttr = false;
//       var tl = new TimelineMax(tmax_optionsGlobal);
//       $.each($('svg *'), function(i, el) {
//          tl.set($(this), {
//             x: '+=' + ((Math.random() * 1000) - 500) ,
//             y: '+=' + ((Math.random() * 1000) - 500),
//             rotation: '+=' + ((Math.random() * 100) - 50) ,
//             scale: 0,
//             opacity: 0.2
//          });
//       });

//       this.tl = tl;

//    }
//    triggerArrows(event) {
//       let approachScroll = document.getElementById('work-component');
//       if (approachScroll) {
//          let distanceToTop = approachScroll.getBoundingClientRect().top;
//          if (distanceToTop <= 400) {
//             this.setState({
//                displayArrows: true,
//             });
//          }
//       }
//       let work_component = document.getElementById('work-component');
//       if(work_component){
//          let scrollview = work_component.getBoundingClientRect().bottom;
//          if (scrollview < window.innerHeight + 100) {
//             this.setState({ showBanner: false });
//          } else {
//             this.setState({ showBanner: true });
//          }
//       }
//    }
//    createCircle() {
//       const canvas = document.getElementById('circCanvas');
//       if(!canvas){
//          return
//       }
//       const context = canvas.getContext('2d');
//       const radius = this.radius;
//       const circ = Math.PI * 2;
//       const quart = Math.PI / 2;
//       const centerX = canvas.width / 2;
//       const centerY = canvas.height / 2;
//       let self = this;
//       const staticCanvas = document.getElementById('staticCircCanvas');
//       if(staticCanvas){
//          const staticContext = staticCanvas.getContext('2d');
//          staticContext.lineWidth = 0.7;
//          staticContext.beginPath();
//          staticContext.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
//          staticContext.strokeStyle = '#CCCCCC';
//          staticContext.stroke();
//       }else{
//          setTimeout( () => {
//             self.createCircle()
//          }, 500)
//          return
//       }
//       context.strokeStyle = '#CCCCCC';
//       context.lineWidth = 4;
//       const timing = 7000;
//       let startTime = Date.now() + 300 ;
//       let endTime = startTime + timing;
//       // let endTime = 10000;
//       var curPerc = 0;
//       let animate = (current) => {
//          let {increment} = this.state;
//          let currentTime = Date.now() + increment;
//          // context.clearRect(0, 0, canvas.width, canvas.height);
//          // context.beginPath();
//          // context.arc(centerX, centerY, radius, -quart, curPerc * current - quart, false);
//          // context.stroke();
//          // curPerc++;
//          // if (curPerc < endTime) {
//          //   requestAnimationFrame(function () {
//          //     animate(curPerc / 100000)
//          //   });

//          if(currentTime <= endTime){
//             const absoluteTime = currentTime - startTime;
//             const current = absoluteTime / timing;
//             context.clearRect(0, 0, canvas.width, canvas.height);
//             context.beginPath();
//             context.arc(centerX, centerY, radius, -quart, circ * current - quart, false);
//             context.stroke();

//             window.requestAnimationFrame(animate)
//          }else{
//             this.removeCanvas();
//             self.setState({
//                pointsZoom: true,
//                canvasAway: true,
//             });

//          }
//       };
//       animate(0);
//    };
//    removeCanvas (){
//       let staticCanvas = document.getElementById('staticCircCanvas');
//       if(staticCanvas){
//          staticCanvas.outerHTML = '';
//       }
//       const canvas = document.getElementById('circCanvasCover');
//       if(!canvas) {return }
//       const contextCover = canvas.getContext('2d');
//       const radius = this.radius;
//       const endPercent = 100;
//       const circCover = Math.PI * 2;
//       const quart = Math.PI / 2;
//       const centerX = canvas.width / 2;
//       const centerY = canvas.height / 2;
//       let curPercCover = 0;
//       let self = this;
//       let animateCover = (current) => {
//          contextCover.lineWidth = 8;
//          contextCover.clearRect(0, 0, canvas.width, canvas.height);
//          contextCover.beginPath();
//          contextCover.arc(centerX, centerY, radius, -quart, circCover * current - quart, false);
//          contextCover.strokeStyle = '#1c1b1d';
//          contextCover.stroke();
//          curPercCover += 4;
//          if (curPercCover <= endPercent) {
//             requestAnimationFrame(() => {
//                animateCover(curPercCover / 100);
//             })
//          }else{
//             const circCanvas = document.getElementById('circCanvas');
//             if(circCanvas) circCanvas.outerHTML = '';
//             canvas.outerHTML = '';
//          }
//       }
//       animateCover(curPercCover)
//    }
//    handleMobile = () => {
//       if (window.innerWidth < 767) {
//          this.setState({
//             mobile: true,
//          });
//       } else {
//          this.setState({
//             mobile: false,
//          });
//       }

//    };
//    switchSlogan = () => {
//       let slogans = document.getElementsByTagName('h2');
//       slogans = Object.keys(slogans).map(k => {
//          return [k, slogans[k]];
//       });
//       let totalSlogans = slogans.length;
//       let repeat;
//       let currSlogan = slogans.slice(this.state.currentSlogan)[0];
//       let oldSlogan = slogans.slice(this.state.oldSlogan)[0];
//       // CSSPlugin.useSVGTransformAttr = true;
//       var stagger_val = 0.004,
//       duration = 0.8;
//       const stagger_opts_to = {
//          x: 0,
//          y: 0,
//          opacity: 1,
//          scale: 1,
//          rotation: 0,
//          ease: 'Power4.easeInOut',
//       };
//       if (slogans.length > 0 && currSlogan) {
//          let currSpans = currSlogan[1].childNodes;
//          let oldSpans = oldSlogan[1].childNodes;
//          let center = 0;

//          for(let i = 0; i < currSpans.length; i++){
//             TweenMax.fromTo(
//                currSpans[i],
//                this.state.transitionTime ,
//                {alpha: 0, y: '-=40' },
//                {alpha: 1, y: '+=45'  }
//             );
//          }

//          for(let i = 0; i < oldSpans.length ; i++){

//             TweenMax.to(
//                oldSpans[i],
//                this.state.transitionTime,
//                { alpha: 0, delay:(0.02*i) }
//             );

//          }
//          if(currSlogan[0] == 6){
//             let hold = document.getElementById('hold-text');
//             if(hold){
//                TweenMax.to(hold, 1, {alpha:0})
//             }
//             this.tl.staggerTo('svg *', duration, stagger_opts_to, stagger_val);
//          }
//          if (this.state.currentSlogan === 0) {
//             repeat = TweenMax.delayedCall(0.7, this.switchSlogan);
//          } else {
//             repeat = TweenMax.delayedCall(this.state.slogansDelayTime, this.switchSlogan);
//          }
//          let multiplier = 1;
//          window.addEventListener('keydown', ev => {
//             if (ev.which === 32) {
//                multiplier *= 1.0800;
//                repeat.timeScale(multiplier);
//             }
//          });
//          this.setState({
//             oldSlogan: this.state.currentSlogan,
//          });
//          if (this.state.currentSlogan < totalSlogans) {
//             this.setState({
//                currentSlogan: this.state.currentSlogan + 1,
//             });
//          }
//       }
//    };
//    _onMouseMove(e) {
//       this.setState({
//          pMouseX: e.clientX - this.windowHalfX,
//          pMouseY: e.clientY - this.windowHalfY
//       })
//    }
//    _onMouseDown() {
//       this.setState({
//          pMouseUp: false,
//          pMouseDown: true,
//       })
//    }
//    _onMouseUp() {
//       this.setState({
//          pMouseUp: true,
//          pMouseDown: false,
//       })
//    }
//    bottomBar() {
//       return (
//          <StyleRoot>
//             <div className="top-footer" >
//                <p id="static-footer-1">&copy; {new Date().getFullYear()}</p>
//                <p id="static-footer-2">An integrated Creative Agency.</p>
//             </div>
//          </StyleRoot>
//       )
//    }
//    handleSpacebar(event) {
//       if (event.key === ' ') {
//          event.preventDefault();
//          let increment = this.state.increment;
//          if(increment)
//          this.setState({
//             increment: this.state.increment + 35 ,
//          });
//       }
//    }
//    render() {
//       const {work,divHeight, pMouseX, pMouseY, pMouseUp, pMouseDown, showBanner, pointsZoom, showLoading, loadingStatus, currentSlogan, render_work} = this.state
//       const fullWidth = window.innerWidth
//       const fullHeight = window.innerHeight
//       return (
//          <StyleRoot>

//             <Helmet>
//                <title>Wunderfauks | An Integrated Creative Agency</title>
//                <meta name="description" content="An integrated creative agency focusing on new and innovative experiences. Design for a Purpose. Transform Brands. Grow Businesses." />
//                <meta name="keywords" content="integrated creative agency,digital marketing solutions,marketing communications,advertising agency,social media and communications,brand strategy,mobile development" />
//                <meta property="og:title" content="Wunderfauks - An Integrated Creative Agency" />
//                <meta property="og:image" content="https://wunderfauks.com/wp-content/themes/wunderfauks/images/logo/logo-big.png" />
//                <meta property="og:description" content="An integrated creative agency focusing on new and innovative experiences. Design for a Purpose. Transform Brands. Grow Businesses." />
//             </Helmet>

//             <NoScript>
//                <h1>We are an integrated creative agency</h1>
//                <h1>since 2010</h1>
//                <h1>transforming & growing with our clients</h1>
//                <h2>Change is the only constant</h2>
//             </NoScript>

//             {showLoading &&
//                <div className={"loader"} >
//                   <Loading
//                      percent={loadingStatus}
//                      spinner={false}
//                      autoIncrement={true}
//                      intervalTime={50}
//                   />
//                </div>
//             }

//             { (work.length) == 0 ?
//                <div id="loadingScreen" />
//                :
//                <div id="home-page" >

//                   <div id="loadingScreen1" />

//                   <div
//                      style={[{ height: fullHeight, opacity: showBanner ? 1 : 0, visibility: showBanner ? 'visible' : 'hidden' }]}
//                      id={'banner-static'}
//                      className="home-inner"
//                      onMouseMove = {this._onMouseMove.bind(this)}
//                      onMouseDown = {this._onMouseDown.bind(this)}
//                      onTouchStart = {this._onMouseDown.bind(this)}
//                      onMouseUp = {this._onMouseUp.bind(this)}
//                      onTouchEnd = {this._onMouseUp.bind(this)} >

//                      <div id={'sloganParent'}>
//                         <h2 />
//                         <h2><div>hi,</div></h2>
//                         <h2><div>we are an<br/>integrated<br/>creative<br/>agency</div></h2>
//                         <h2><div>since 2010</div></h2>
//                         <h2><div>transforming<br/>& growing<br/>with<br/>our clients</div></h2>
//                         <h2><div>through<br/>our belief</div></h2>
//                         <h2 />
//                      </div>

//                      {this.state.mobile ? (
//                         <div>
//                            <canvas height={fullHeight} width={fullWidth} id={'circCanvas'} />
//                            <canvas height={fullHeight} width={fullWidth} id={'circCanvasCover'} />
//                            <canvas height={fullHeight} width={fullWidth} id={'staticCircCanvas'} />
//                         </div>
//                      ) : (
//                         <div>
//                            <canvas height={fullHeight} width={fullWidth} id={'circCanvas'} />
//                            <canvas height={fullHeight} width={fullWidth} id={'circCanvasCover'} />
//                            <canvas height={fullHeight} width={fullWidth} id={'staticCircCanvas'} />
//                            <span id={'hold-text'} className="hold">hold spacebar to speed up</span>
//                         </div>

//                      )}

//                      {/* <div id="home-text" >
//                         <figure id="slogan-svg-figure">
//                            <ShreddedText />
//                         </figure>
//                      </div> */}

//                      {/* <PointsAnimation pMouseX={pMouseX} pMouseY={pMouseY} pMouseUp={pMouseUp} pMouseDown={pMouseDown} zoom={pointsZoom} /> */}

//                      {this.bottomBar()}
//                      <button
//                         className={'down-button'}
//                         onClick={() => scrollToComponent(this.homework, { offset: 0, align: 'top', duration: 1000 })}>
//                         <div style={{color: '#8c8c8c', fontSize: '10px'}}>Works</div>
//                         {/* <img src={downArrow} alt={'down arrow'} /> */}
//                      </button>
//                   </div>
//                   <div
//                      id="work-component"
//                      style={{zIndex: '-1'}}
//                      ref={section => {
//                         this.homework = section;
//                      }} >

//                      { work.length !== 0 &&
//                         <div>
//                            <div className={'work-list'} id="content-scrollview"
//                               style={{paddingBottom: '0px', background: '#1c1b1d'}}  >
//                               <Container fluid={true}>
//                                  <Row>
//                                     <div>
//                                        {this.state.work.map( (post, i) => (
//                                           <Col md={4} xs={12} key={'col'+i}>
//                                              <Fade bottom duration={700} delay={(i+1)*20} key={'fade'+i}>
//                                                 <Link to={`/work/${post.slug}`} key={post.id}>
//                                                 <Image src={post.acf.image.sizes.medium_large} alt={post.acf.image.alt} responsive="true" />
//                                                 <div className="work-cover" />
//                                                 <h1 className="work-titles" >{post.title.rendered}</h1>
//                                                 <p className="work-subtitles" >{post.acf.work_category}</p>
//                                                 {i < 10
//                                                    ?
//                                                    <span style={{height: divHeight+'px', lineHeight: divHeight+'px', zIndex: '1'}} className='work-cover-num'>
//                                                       <p style={{margin:'0',height: divHeight+'px', lineHeight: divHeight+'px'}}>0{i+1}</p>
//                                                    </span>
//                                                    :
//                                                    <span style={{height: divHeight+'px', lineHeight: divHeight+'px', zIndex: '1'}} className='work-cover-num'>
//                                                       <p style={{margin:'0',height: divHeight+'px', lineHeight: divHeight+'px'}}>{i+1}</p>
//                                                    </span>
//                                                 }

//                                              </Link>
//                                           </Fade>
//                                        </Col>
//                                     ))}
//                                  </div>
//                               </Row>
//                            </Container>

//                         </div>

//                      </div>
//                   }



//                </div>

//             </div>
//          }
//       </StyleRoot>

//    );

// }

// }
