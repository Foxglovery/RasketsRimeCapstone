import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetVenueById, updateVenue } from "../../managers/venueManager";
import { GetServices } from "../../managers/serviceManager";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";

export default function UpdateVenue({ loggedInUser }) {
    const {venueId} = useParams();
    const [venue, setVenue] = useState({});
    const [services, setServices] = useState([]);
    const [chosenServiceId, setChosenServiceId] = useState(null);
    const [venueName, setVenueName] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [maxOccupancy, setMaxOccupancy] = useState(0);
    const [imgUrl, setImgUrl] = useState("");
    const [serviceIds, setServiceIds] = useState([]);
    const [errorMessage, setErrorMessage] = (useState(""));
    const [isActive, setIsActive] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVenueDetails = async () => {
            const venueDetails = await GetVenueById(venueId);
            setVenue(venueDetails);
            setVenueName(venueDetails.venueName || "");
            setAddress(venueDetails.address || "");
            setDescription(venueDetails.description || "");
            setContactInfo(venueDetails.contactInfo || "");
            setMaxOccupancy(venueDetails.maxOccupancy || 0);
            setImgUrl(venueDetails.imageUrl || "");
            setIsActive(venueDetails.isActive);
           
            //map over venue services pulling out the ids into an array
            const selectedServiceIds = venueDetails.venueServices.map(vs => vs.serviceId);
            setServiceIds(selectedServiceIds);
        };
        fetchVenueDetails();
        GetServices().then(setServices);
    },[venueId])

    const newVenue = {
        venueName: venueName,
        address: address,
        description: description,
        contactInfo: contactInfo,
        imageUrl: imgUrl,
        maxOccupancy: maxOccupancy,
        isActive: isActive,
        serviceIds: serviceIds
    }

    const handleNameChange = (event) => {
        setVenueName(event.target.value);
      };

    const handleToggleChecked = () => {
        setIsActive(!isActive);
    }

      const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
      };
      const handleAddressChange = (event) => {
        setAddress(event.target.value);
      }
      const handleImgChange = (event) => {
        setImgUrl(event.target.value);
      }
      const handleContactChange = (event) => {
        setContactInfo(event.target.value);
      }
      const handleMaxOccChange = (event) => {
        setMaxOccupancy(parseInt(event.target.value));
      }
      const handleServiceSelection = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) =>
          parseInt(option.value)
        );
        setServiceIds(selectedOptions);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("New Venue", newVenue)
        try {
          const data = await updateVenue(venueId, newVenue);

          if (data && !data.error) {
            console.log('Venue updated successfully', data);
            navigate(`/admin/venues`);
          } else {
            const errorMsg = data.error || 'Failed to update venue';
            setErrorMessage("Sorry, we couldn't update the venue" + errorMsg);
            console.error('Failed to update venue:', data);
          }
        } catch (error) {
          let errorMsg = error.message || 'Error submitting venue';
          if (typeof errorMsg === 'string' && errorMsg.startsWith('{')) {
            try {
              const parsedError = JSON.parse(errorMsg);
              errorMsg = parsedError.error || errorMsg;
            } catch (parsedError) {

            }
          }

          setErrorMessage("Sorry, there was a problem: " + errorMsg);
          console.error('Error submitting venue', error);
        }
      };

    return (
        <div className="client-background">
        <Container className="">
          <Row>
            <Col md={8} className="mx-auto">
              <h3  className="text-center create-form-text mb-4">Update Venue</h3>
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
                  <Label for="venueName" className="create-form-text">Venue Name</Label>
                  <Input
                  required
                    id="venueName"
                    name="venueName"
                    type="text"
                    value={venueName}
                    className="form-control"
                    placeholder="Enter the name of your venue"
                    onChange={handleNameChange}
                  />
                </FormGroup>
    
                {/* Service Select */}
                
    
                
    
                {/* Services multiselect */}
                <FormGroup>
                  <Label for="serviceMulti" className="create-form-text">Select Services</Label>
                  <Input
                    id="serviceMulti"
                    multiple
                    name="serviceMulti"
                    type="select"
                    value={serviceIds}
                    className="form-control"
                    onChange={handleServiceSelection}
                  >
                    {services.map((service, index) => (
                      <option key={index} value={service.id}>
                        {service.serviceName}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
    
                <FormGroup>
                  <Label for="maxOcc" className="create-form-text">Max Occupancy</Label>
                  <Input
                  required
                    id="maxOcc"
                    name="maxOcc"
                    placeholder="How many people can this space hold?"
                    type="number"
                    value={maxOccupancy}
                    onChange={handleMaxOccChange}
                  />
                </FormGroup>
                {/* Address Field */}
                <FormGroup>
                  <Label for="address" className="create-form-text">Address</Label>
                  <Input
                  required
                    id="address"
                    name="address"
                    type="text"
                    value={address}
                    placeholder="Where is the venue located?"
                    onChange={handleAddressChange}
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
                {/* Contact Info */}
                <FormGroup>
                  <Label for="contact" className="create-form-text">Contact Info</Label>
                  <Input
                  required
                    id="contact"
                    name="contact"
                    type="text"
                    value={contactInfo}
                    placeholder='Supply contact info in this format (FirstName LastName at ###-###-####)'
                    onChange={handleContactChange}
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
                    placeholder="Describe the venue"
                    onChange={handleDescriptionChange}
                  />
                </FormGroup>
    
               <FormGroup check className="center-checkbox">
                    <Input 
                    type="checkbox"
                    checked={isActive}
                    onChange={handleToggleChecked}
                    />{" "}
                     <Label className="create-form-text" check>Is this venue active</Label>
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