namespace RasketsRime.Models.DTOs;

public class EventServiceDTO
{
    public int Id { get; set; }
    public int EventId { get; set; }
    public int ServiceId { get; set; }
    public ServiceDTO Service { get; set; }
}