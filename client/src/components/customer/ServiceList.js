import { useEffect, useState } from "react"

import "../styles/client/ServiceList.css"
import { GetServices } from "../managers/serviceManager";
export default function ServiceList() {
    const [services, setServices] = useState([]);
    
    useEffect(() => {
        GetServices().then(setServices);
    }, [])
    return (<>
    <div className="venue-background-image">
		<div className="service-header">
			<h1>Our Services</h1>
		</div>
		<div className="cards-container">
		{services.map(s => (
			<div className="blog-card" key={s.id} style={{ backgroundImage: `url(${s.imageUrl})` }} >
				<div className="image-overlay"></div>
<div className="blog-card spring-fever">
  <div className="title-content">
    <h3>{s.serviceName}</h3>
    <hr />
	
		<div className="intro">{s.description}</div>
	
    
  </div>
  <ul className="card-info">
   {s.venueServices && s.venueServices.map(vs => (
	<li>{vs.venue.venueName}</li>
   ))}
  </ul>
  <div className="utility-info">
    <ul className="utility-list">
      <li className="comments">{s.price}</li>
      <li className="date">03.12.2015</li>
    </ul>
  </div>
  {/* overlays */}
  <div className="gradient-overlay"></div>
  <div className="color-overlay"></div>
</div>
			</div>
		))}
		</div>
	

    </div>
        
    </>)
}