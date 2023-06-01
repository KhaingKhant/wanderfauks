import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressBar from 'react-progress-bar-plus';
import ApiUrl from '../api/ApiUrl';
import { Link } from 'react-router-dom';
import { Col, Row, Container, Image } from 'react-bootstrap';

const WorkGrid = () => {
  const [workData, setWorkData] = useState([]);
  const [divHeight, setDivHeight] = useState('');
  const [showLoading, setShowLoading] = useState(true);
  const [loadingPercent, setLoadingPercent] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(ApiUrl);
        const data = response.data;
        setWorkData(data);
        setLoadingPercent(40);
        setTimeout(() => {
          setLoadingPercent(100);
          setTimeout(() => {
            setShowLoading(false);
          }, 400);
        }, 1000);
      } catch (error) {
        console.error('Error fetching work data:', error);
      }
    };

    fetchData();

    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const newDivHeight = windowWidth > 1200 ? (windowWidth / 3) * (9 / 16) : windowWidth * (9 / 16);
      setDivHeight(newDivHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {showLoading && (
        <div className='loader'>
          <ProgressBar percent={loadingPercent} spinner={false} autoIncrement={true} intervalTime={50} />
        </div>
      )}

      {workData.length === 0 ? (
        <div id='loadingScreen' />
      ) : (
        <div className='work-list' id='content-scrollview' style={{ paddingBottom: '0px', background: '#1a181b' }}>
          <Container fluid>
            <Row>
              {workData.map((workDetail, i) => (
                <Col md={4} xs={12} key={i}>
                    <div style={{ position: 'relative' }}>
                      <Link to={`/work/${workDetail.acf.client}`} key={workDetail.id}>
                        <Image src={workDetail.acf.image.sizes.medium_large} alt={workDetail.acf.image.alt} responsive />
                        <div className='work-cover' />
                        <h1 className='work-titles'>{workDetail.acf.client}</h1>
                        <p className='work-subtitles'>{workDetail.acf.work_category}</p>
                        <span style={{ height: `${divHeight}px`, lineHeight: `${divHeight}px`, zIndex: '1' }} className='work-cover-num'>
                          <p style={{ margin: '0', height: `${divHeight}px`, lineHeight: `${divHeight}px` }}>{i < 10 ? `0${i + 1}` : i + 1}</p>
                        </span>
                      </Link>
                    </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default WorkGrid;
