import { useEffect, useState } from "react"
import { GetEventsByUserId } from "../managers/eventManager";
import "../styles/client/MyEventsList.css"
import { Button } from "reactstrap";
export default function MyEventsList({ loggedInUser }) {
    const [myEvents, setMyEvents] = useState([]);
    
    useEffect(() => {
        GetEventsByUserId(loggedInUser.id).then(setMyEvents);
        
        
    },[])

    const formatEventTime = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`
    }

    return (
        <div className="background-image">
            <section class="">
	<div class="container py-4">
		<h1 class="h1 text-center" id="pageHeaderTitle">My Events</h1>
        {myEvents.map(me => (
           <article class="postcard dark blue">
			<a class="postcard__img_link" href="#">
				<img class="postcard__img" src={me.venue.imageUrl} alt="Image Title" />
			</a>
			<div class="postcard__text">
				<h1 class="postcard__title blue"><a href="#">{me.eventName}</a></h1>
                <h3 className="postcard-my-venue-text">@ {me.venue.venueName}</h3>
				
                <div class="postcard__subtitle small">
					
						<i class="fas fa-calendar-alt mr-2"></i>{me.status}
						
					
				</div>
                <div class="postcard__subtitle small">
					
						<i class="fas fa-calendar-alt mr-2"></i>{me.venue.address}
						
					
				</div>
				
				<div class="postcard__subtitle small">
						<i class="fas fa-calendar-alt mr-2"></i>{formatEventTime(me.eventStart)}
				</div>
				<div class="postcard__bar"></div>
				<div class="postcard__preview-txt">{me.eventDescription}</div>
				<ul class="postcard__tagbox">
					{/* <li class="tag__item"><i class="fas fa-tag mr-2"></i>Podcast</li>
					<li class="tag__item"><i class="fas fa-clock mr-2"></i>55 mins.</li> */}
					{me.eventServices && me.eventServices.map(ev => (
                      <li class="tag__item play blue">
						<a href="#"><i class="fas fa-play mr-2"></i>{ev.service.serviceName}</a>
					</li>  
                    ))}
                        
                    
				</ul>
                <div class="postcard__subtitle small">
					
						<i class="fas fa-calendar-alt mr-2"></i>Have questions? Reach out to <a href="#">{me.venue.contactInfo}</a> 
					
				</div>
				<div class="postcard__bar"></div>
            {loggedInUser.id == me.userId && <div className="my-events-btn-container">
                <Button className="my-events-btn">Update Event</Button>
                <Button className="my-events-btn" >Cancel Event</Button>
            </div>}
            

			</div>
		</article> 
        ))}
		
		
		{/* When I remove this second card, the white space shows  */}
		
	</div>
</section>
        </div>
    )
}