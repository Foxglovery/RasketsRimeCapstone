using System.ComponentModel.DataAnnotations;

namespace RasketsRime.Models;

public class VenueService
{
    public int Id { get; set; }
    public int VenueId { get; set; }
    public int ServiceId { get; set; }
    public Service ServiceDetails { get; set; }
    
}