namespace RasketsRime.Models.DTOs;

public class UpdateEventDTO
{
  public int Id { get; set; }
  public int UserId { get; set; }
  public int VenueId { get; set; }
  public UserProfileDTO UserProfile { get; set; }

  public string EventName { get; set; }
  public int ExpectedAttendees { get; set; }

  public string EventDescription { get; set; }
  public bool IsPublic { get; set; }
  public VenueDTO Venue { get; set; }
  public List<EventServiceDTO> EventServices { get; set; }
  public DateTime? SubmittedOn { get; set; }

  public string Status { get; set; }

  public DateTime EventStart { get; set; }
  public int Duration { get; set; }
  public List<int> ServiceIds { get; set; }
}