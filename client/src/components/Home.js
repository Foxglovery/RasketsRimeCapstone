import React from "react";
import { Container, Row, Col } from "reactstrap";
import rasketsImage from "../assets/Raskets-Rime-Capstone.png";
import backgroundImage from "../assets/brown-blue-wood.jpg";
import "./styles/Home.css";

export default function Home({ loggedInUser }) {
  // const backgroundStyle = {
  //   minHeight: "100vh",
  //   background: `url(${backgroundImage}) no-repeat center center fixed`,
  //   backgroundSize: "cover",
  //   color: "white",
  // };

  return (
    <div className="client-background">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} className="text-center home-container">
            <img
              src={rasketsImage}
              alt="Event"
              className="img-fluid mb-4 rounded-image"
              style={{ maxWidth: "100%", height: "auto" }}
            />

            <h2>Come Bask In The Warm Glow</h2>
            <p>Having a hootennany?</p>
            <p>Book it today at one of our unbelievable sites!</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
