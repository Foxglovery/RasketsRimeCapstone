

namespace RasketsRime.Models.DTOs;

public class VenueServiceDTO
{
    public int Id { get; set; }
    public int VenueId { get; set; }
    public int ServiceId { get; set; }
    public ServiceDTO ServiceDetails { get; set; }
    
}