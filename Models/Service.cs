using System.ComponentModel.DataAnnotations;

namespace RasketsRime.Models;

public class Service
{
    public int Id { get; set; }
    [Required]
    public string ServiceName { get; set; }
    [Required]
    public string Description { get; set; }
    public decimal Price { get; set; }
    [Required]
    public bool IsActive { get; set; }
    
}