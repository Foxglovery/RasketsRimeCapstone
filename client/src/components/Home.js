import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import rasketsImage from '../assets/Raskets-Rime-Capstone.png';
import backgroundImage from '../assets/brown-blue-wood.jpg';
import './styles/Home.css';

export default function Home({loggedInUser}) {
    // const backgroundImage = 'https://ibb.co/0CyBcyy';
    const backgroundStyle = {
        minHeight: '100vh',
        background: `url(${backgroundImage}) no-repeat center center fixed`, 
        backgroundSize: 'cover', // Ensure it covers the entire background
        color: 'white',
    };
    
    return (
        <div  style={backgroundStyle}>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            {/* Image */}
            <img 
              src={rasketsImage} // Replace with your image path
              alt="Event"
              className="img-fluid mb-4 rounded-image"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            {/* Text */}
            <h2>Come Bask In The Warm Glow</h2>
            <p>Having a hootennany?</p>
            <p>Book it today at one of our unbelievable sites!</p>
          </Col>
        </Row>
      </Container>
    </div>
    )
}