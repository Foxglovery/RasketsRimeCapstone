

namespace RasketsRime.Models.DTOs;

public class EventDTO
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public UserProfileDTO UserProfile { get; set; }
    public int VenueId { get; set; }

    public string EventName { get; set; }
    public int ExpectedAttendees { get; set; }

    public string EventDescription { get; set; }
    public bool IsPublic { get; set; }
    public DateTime SubmitedOn { get; set; }

    public string Status { get; set; }

    public DateTime EventStart { get; set; }
    public int Duration { get; set; }

    public DateTime EventEnd
    {
        get
        {
            return EventStart.AddHours(Duration);
        }
    }
    public VenueDTO Venue { get; set; }
    public List<EventServiceDTO> EventServices { get; set; }

    public decimal TotalCost
    {
        get
        {
            return EventServices != null ? EventServices.Sum(es => es.Service.Price) : 0m;
        }
    }


}