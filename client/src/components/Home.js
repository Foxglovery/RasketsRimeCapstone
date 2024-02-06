import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import rasketsImage from "../assets/Raskets-Rime-Capstone.png";

import "../styles/Home.css";
import withMinimumLoadingTime from "./WithMinimumLoadingTime";
import CircleLoader from "react-spinners/CircleLoader";

export default function Home({ loggedInUser }) {
    const [isLoading, setIsLoading] = useState(true);

    //using the image load to control the spinner
    useEffect(() => {
      const imageLoadPromise = new Promise((resolve) => {
        const img = new Image();
        //when the image finishes loading, the promise will resolve
        img.onload = resolve;
        img.src = rasketsImage;
        if (img.complete) resolve();
      });

      withMinimumLoadingTime(imageLoadPromise).then(() => setIsLoading(false));
    },[])

  return (
    <div className="dashboard-background">
      {isLoading ? (
        <div className="home-spinner-ctn">
          <CircleLoader loading={isLoading} color="white" size={100} />
        </div>
      ) : (
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
      )}
      
    </div>
  );
}
