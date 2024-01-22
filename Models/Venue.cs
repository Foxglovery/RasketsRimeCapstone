using System.ComponentModel.DataAnnotations;

namespace RasketsRime.Models;

public class Venue
{
    public int Id { get; set; }
    [Required]
    public string VenueName { get; set; }
    [Required]
    public string Address { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public string ContactInfo { get; set; }
    public int MaxOccupancy { get; set; }
    [Required]
    public bool IsActive { get; set; }
    public List<VenueService> VenueServices { get; set; }

}