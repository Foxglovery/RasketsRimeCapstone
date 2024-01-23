using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.Eventing.Reader;

namespace RasketsRime.Models;

public class Event
{
    public int Id { get; set; }
    public int UserId { get; set; }
    [ForeignKey("UserId")]
    public UserProfile UserProfile { get; set; }
    public int VenueId { get; set; }
    [Required]
    public string EventName { get; set; }
    public int ExpectedAttendees { get; set; }
    [Required]
    public string EventDescription { get; set; }
    [Required]
    public bool IsPublic { get; set; }
    
    public DateTime? SubmitedOn { get; set; }
    [Required]
    public string Status { get; set; }
    [Required]
    public DateTime EventStart { get; set; }
    public int Duration { get; set; }
    
    public DateTime EventEnd
    {
        get {
            return EventStart.AddHours(Duration);
        }
    }
    public Venue Venue { get; set; }
    public List<EventService> EventServices { get; set; }


}