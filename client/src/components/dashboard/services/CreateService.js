
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { GetVenues } from "../../managers/venueManager";
import "../../styles/dash/CreateEventAdmin.css"
import { Link, useNavigate } from "react-router-dom";
import { CreateNewService } from "../../managers/serviceManager";
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
    const navigate = useNavigate();

    useEffect(() => {
        GetVenues().then(setVenues);
    },[])


    const newService = {
        serviceName: serviceName,
        description: description,
        price: price,
        imageUrl: imgUrl,
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
      const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const data = await CreateNewService(newService);

          if (data && !data.error) {
            console.log('Service created successfully', data);
            navigate(`/admin/services`);
          } else {
            const errorMsg = data.error || 'Failed to create service';
            setErrorMessage('Sorry, we couldnt create the service' + errorMsg);
            console.error('Failed to create service:', data);
          }
        } catch (error) {
          let errorMsg = error.message || 'Error submitting service';
          if (typeof errorMsg === 'string' && errorMsg.startsWith('{')) {
            try {
              const parsedError = JSON.parse(errorMsg);
              errorMsg = parsedError.error || errorMsg;
            } catch (parsedError) {

            }
          }

          setErrorMessage("Sorry, there was a problem: " + errorMsg);
          console.error('Error submitting service', error);
        }
      };
    const handleVenueSelection = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) =>
          parseInt(option.value)
        );
        setVenueIds(selectedOptions);
      };
    return (
        <div className="dashboard-background">
    <Container className="">
      <Row>
        <Col md={8} className="mx-auto dash-margin">
          <h3  className="text-center create-form-text mb-4">Add A Service</h3>
          <div className="centered-content">
          <Link to={`/userprofiles`} className="chip-link">
            Users
          </Link>
          <Link to={`/admin/events`} className="chip-link">
            Events
          </Link>
          <Link to={`/admin/venues`} className="chip-link">
            Venues
          </Link>
          <Link to={`/admin/services`} className="chip-link">
            Services
          </Link>
        </div>
          <Form>
            {/* Event Name */}
            <FormGroup>
              <Label for="eventName" className="create-form-text">Service Name</Label>
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
              <Label for="venueMulti" className="create-form-text">Select Venues</Label>
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