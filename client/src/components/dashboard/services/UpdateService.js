import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetServiceById, updateService } from "../../managers/serviceManager";
import { GetVenues } from "../../managers/venueManager";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";

export default function UpdateService({loggedInUser}) {
    const {id} = useParams();
    const [service, setService] = useState({});
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
        const fetchServiceDetails = async () => {
            const serviceDetails = await GetServiceById(id);
            setService(serviceDetails);
            setServiceName(serviceDetails.serviceName || "");
            setDescription(serviceDetails.description || "");
            setPrice(serviceDetails.price || 0);
            setImgUrl(serviceDetails.imageUrl || "");
            setIsActive(serviceDetails.isActive);

            //extract venueids
            const selectedVenueIds = serviceDetails.venueServices.map(vs => vs.venueId);
            setVenueIds(selectedVenueIds);
        };
        fetchServiceDetails(id);
        GetVenues().then(setVenues);
    },[id])
    
    const updatedService = {
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
      const handlePriceChange = (event) => {
        setPrice(parseInt(event.target.value));
      }
      const handleImgChange = (event) => {
        setImgUrl(event.target.value);
      }
      
      const handleVenueSelection = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) =>
          parseInt(option.value)
        );
        setVenueIds(selectedOptions);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Updated Service", updatedService)
        try {
          const data = await updateService(id, updatedService);

          if (data && !data.error) {
            console.log('Service updated successfully', data);
            navigate(`/admin/services`);
          } else {
            const errorMsg = data.error || 'Failed to update service';
            setErrorMessage("Sorry, we couldn't update the service" + errorMsg);
            console.error('Failed to update service:', data);
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

    return (
        <div className="client-background">
        <Container className="">
          <Row>
            <Col md={8} className="mx-auto">
              <h3  className="text-center create-form-text mb-4">Update Service</h3>
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
                {/* Venue Name */}
                <FormGroup>
                  <Label for="serviceName" className="create-form-text">Service Name</Label>
                  <Input
                  required
                    id="serviceName"
                    name="serviceName"
                    type="text"
                    value={serviceName}
                    className="form-control"
                    placeholder="Enter the name of your venue"
                    onChange={handleNameChange}
                  />
                </FormGroup>
    
                {/* Service Select */}
                
    
                
    
                {/* Services multiselect */}
                <FormGroup>
                  <Label for="venueMulti" className="create-form-text">Select Venues</Label>
                  <Input
                    id="venueMulti"
                    multiple
                    name="venueMulti"
                    type="select"
                    value={venueIds}
                    className="form-control"
                    onChange={handleVenueSelection}
                  >
                    {venues.map((v, index) => (
                      <option key={index} value={v.id}>
                        {v.venueName}
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
                    placeholder="How much does this service cost?"
                    type="number"
                    value={price}
                    onChange={handlePriceChange}
                  />
                </FormGroup>
                
                
                {/* Image URl */}
                <FormGroup>
                  <Label for="imgUrl" className="create-form-text">Image Url</Label>
                  <Input
                  required
                    id="imgUrl"
                    name="imgUrl"
                    type="text"
                    value={imgUrl}
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
                    value={description}
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