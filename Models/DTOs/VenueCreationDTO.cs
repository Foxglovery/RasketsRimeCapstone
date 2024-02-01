namespace RasketsRime.Models.DTOs;

public class VenueCreationDTO
{
    public int Id { get; set; }
    
    public string VenueName { get; set; }
   
    public string Address { get; set; }
   
    public string Description { get; set; }
    
    public string ContactInfo { get; set; }

    public string ImageUrl { get; set;}
    public int MaxOccupancy { get; set; }
  
    public bool IsActive { get; set; }
    public List<int> ServiceIds { get; set; }
}