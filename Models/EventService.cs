namespace RasketsRime.Models;

public class EventService
{
    public int Id { get; set; }
    public int EventId { get; set; }
    public int ServiceId { get; set; }
    public Service Service { get; set; }
}