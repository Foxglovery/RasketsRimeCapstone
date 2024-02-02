
namespace RasketsRime.Models.DTOs;

public class UpdateServiceDTO
{
    public int Id { get; set; }

    public string ServiceName { get; set; }
   
    public string Description { get; set; }
    public decimal Price { get; set; }
    public string ImageUrl {get; set; }
   
    public bool IsActive { get; set; }
    public List<int> VenueIds { get; set; }
}