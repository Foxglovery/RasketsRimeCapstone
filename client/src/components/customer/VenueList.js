import { useEffect, useState } from "react"
import { GetVenues } from "../managers/venueManager";
import "../styles/client/VenueList.css"
export default function VenueList() {
    const [venues, setVenues] = useState([]);
    
    useEffect(() => {
        GetVenues().then(setVenues);
    }, [])
    return (<>
    <div className="venue-background-image">
        <section class="">
	<div class="container py-4">
		<h1 class="h1 text-center" id="pageHeaderTitle">Our Venues</h1>
        {venues.map(v => (
           <article class="postcard dark blue">
			<a class="postcard__img_link" href="#">
				<img class="postcard__img" src={v.imageUrl} alt="Image Title" />
			</a>
			<div class="postcard__text">
				<h1 class="postcard__title blue"><a href="#">{v.venueName}</a></h1>
				<div class="postcard__subtitle small">
					
						<i class="fas fa-calendar-alt mr-2"></i>{v.address}
					
				</div>
				<div class="postcard__bar"></div>
				<div class="postcard__preview-txt">{v.description}</div>
				<ul class="postcard__tagbox">
					{/* <li class="tag__item"><i class="fas fa-tag mr-2"></i>Podcast</li>
					<li class="tag__item"><i class="fas fa-clock mr-2"></i>55 mins.</li> */}
					{v.venueServices && v.venueServices.map(vs => (
                      <li class="tag__item play blue">
						<a href="#"><i class="fas fa-play mr-2"></i>{vs.service.serviceName}</a>
					</li>  
                    ))}
                        
                    
				</ul>
                <div class="postcard__subtitle small">
					
						<i class="fas fa-calendar-alt mr-2"></i>Have questions? Reach out to <a href="#">{v.contactInfo}</a> 
					
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