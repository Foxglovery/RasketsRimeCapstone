using Microsoft.AspNetCore.Identity;
using RasketsRime.Models.DTOs;
using System.ComponentModel.DataAnnotations;

namespace RasketsRime.Models;

public class UserProfile
{
    public int Id { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public string Address { get; set; }
    
    
    [Required]
    public bool IsAdmin { get; set; }
    public List<string>? Roles { get; set; }
    
    public string ProfileImage { get; set; }
    [Required]
    
    public string IdentityUserId { get; set; }
    

    public IdentityUser IdentityUser { get; set; }
    public List<Event> Events { get; set; }

   
}