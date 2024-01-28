import { useEffect, useState } from "react"

import "../styles/client/VenueList.css"
import { GetServices } from "../managers/serviceManager";
export default function ServiceList() {
    const [services, setServices] = useState([]);
    
    useEffect(() => {
        GetServices().then(setServices);
    }, [])
    return (<>
    <div className="venue-background-image">
        <section class="">
	<div class="container py-4">
		<h1 class="h1 text-center" id="pageHeaderTitle">Services</h1>
        {services.map(s => (
           <article class="postcard dark blue">
			<a class="postcard__img_link" href="#">
				<img class="postcard__img" src={s.imageUrl} alt="Image Title" />
			</a>
			<div class="postcard__text">
				<h1 class="postcard__title blue"><a href="#">{s.serviceName}</a></h1>
				<div class="postcard__subtitle small">
					
						<i class="fas fa-calendar-alt mr-2"></i>{}
					
				</div>
				<div class="postcard__bar"></div>
				<div class="postcard__preview-txt">{s.description}</div>
				<ul class="postcard__tagbox">
					{/* <li class="tag__item"><i class="fas fa-tag mr-2"></i>Podcast</li>
					<li class="tag__item"><i class="fas fa-clock mr-2"></i>55 mins.</li> */}
					{s.venueServices && s.venueServices.map(vs => (
                      <li class="tag__item play blue">
						<a href="#"><i class="fas fa-play mr-2"></i>{vs.venue.venueName}</a>
					</li>  
                    ))}
                        
                    
				</ul>
                <div class="postcard__subtitle small">
					
						<i class="fas fa-calendar-alt mr-2"></i>${s.price}
					
				</div>
				<div class="postcard__bar"></div>
			</div>
		</article> 
        ))}
		
		
		{/* When I remove this second card, the white space shows  */}
		
	</div>
</section>
    </div>
        
    </>)
}