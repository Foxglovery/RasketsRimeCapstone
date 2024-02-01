
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { GetVenues } from "../../managers/venueManager";
import "../../styles/dash/CreateEventAdmin.css"
export default function CreateService() {
    const [venues, setVenues] = useState([]);
    const [chosenVenueId, setChosenVenueId] = useState(null);
    const [serviceName, setServiceName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0)
    const [imgUrl, setImgUrl] = useState("");
    const [venueIds, setVenueIds] = useState([]);
    const [errorMessage, setErrorMessage] = (useState(""));
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        GetVenues().then(setVenues);
    },[])


    const newService = {
        serviceName: serviceName,
        description: description,
        price: price,
        imgUrl: imgUrl,
        isActive: isActive,
        venueIds: venueIds
    }
    const handleNameChange = (event) => {
        setServiceName(event.target.value);
      };

    const handleToggleChecked = () => {
        setIsActive(!isActive);
    }

      const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
      };
      const handleImgChange = (event) => {
        setImgUrl(event.target.value);
      }
      const handlePriceChange = (event) => {
        setPrice(parseInt(event.target.value));
      }
      const handleSubmit =(e) => {
        console.log(e)
      }
    const handleVenueSelection = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) =>
          parseInt(option.value)
        );
        setVenueIds(selectedOptions);
      };
    return (
        <div className="background-image">
    <Container className="">
      <Row>
        <Col md={8} className="mx-auto">
          <h3  className="text-center create-form-text mb-4">Create An Event</h3>
          <Form>
            {/* Event Name */}
            <FormGroup>
              <Label for="eventName" className="create-form-text">Event Name</Label>
              <Input
              required
                id="eventName"
                name="eventName"
                type="text"
                className="form-control"
                placeholder="Enter the name of your event"
                onChange={handleNameChange}
              />
            </FormGroup>

            {/* Venue Select */}
            

            

            {/* Services multiselect */}
            <FormGroup>
              <Label for="venueMulti" className="create-form-text">Select Services</Label>
              <Input
                id="venueMulti"
                multiple
                name="venueMulti"
                type="select"
                className="form-control"
                onChange={handleVenueSelection}
              >
                {venues.map((venue, index) => (
                  <option key={index} value={venue.id}>
                    {venue.venueName}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="price" className="create-form-text">Price</Label>
              <Input
              required
                id="price"
                name="price"
                placeholder="How much does this cost?"
                type="number"
                onChange={handlePriceChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="imgUrl" className="create-form-text">Image Url</Label>
              <Input
              required
                id="imgUrl"
                name="imgUrl"
                type="text"
                placeholder="Please supply an image URL"
                onChange={handleImgChange}
              />
            </FormGroup>

            {/* Service Description */}
            <FormGroup>
              <Label for="description" className="create-form-text">Description</Label>
              <Input
              required
                id="description"
                name="description"
                type="textarea"
                placeholder="Describe the service"
                onChange={handleDescriptionChange}
              />
            </FormGroup>

           <FormGroup check className="center-checkbox">
                <Input 
                type="checkbox"
                checked={isActive}
                onChange={handleToggleChecked}
                />{" "}
                 <Label className="create-form-text" check>Is this service active</Label>
           </FormGroup>
            
              
            

            
            

            

            {/* Submit */}
            <FormGroup className="text-center">
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              <Button className="btn btn-primary mt-3 create-event-submit-btn" onClick={handleSubmit}>Submit</Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  </div>
    )
}