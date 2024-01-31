// This code snippet defines a controller class for managing user profiles in an API. It includes methods for retrieving user profiles, retrieving user profiles with roles (only accessible to admins), promoting a user to admin role, and demoting a user from admin role.
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RasketsRime.Data;
using RasketsRime.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using RasketsRime.Models;
using Microsoft.AspNetCore.Identity;

namespace RasketsRime.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserProfileController : ControllerBase
{
    private RasketsRimeDbContext _dbContext;

    public UserProfileController(RasketsRimeDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext
            .UserProfiles
            .Include(up => up.IdentityUser)
            .Select(up => new UserProfileDTO
            {
                Id = up.Id,
                FirstName = up.FirstName,
                LastName = up.LastName,
                Address = up.Address,
                IdentityUserId = up.IdentityUserId,
                Email = up.IdentityUser.Email,
                UserName = up.IdentityUser.UserName,
                IsAdmin = up.IsAdmin
            })
            .ToList());
    }

    [HttpGet("withroles")]
    [Authorize(Roles = "Admin")]
    public IActionResult GetWithRoles()
    {
        return Ok(_dbContext.UserProfiles
        .Include(up => up.IdentityUser)
        .Select(up => new UserProfileDTO
        {
            Id = up.Id,
            FirstName = up.FirstName,
            LastName = up.LastName,
            Address = up.Address,
            Email = up.IdentityUser.Email,
            UserName = up.IdentityUser.UserName,
            IdentityUserId = up.IdentityUserId,
            IsAdmin = up.IsAdmin,
            Roles = _dbContext.UserRoles
            .Where(ur => ur.UserId == up.IdentityUserId)
            .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
            .ToList()
        }));

    }

    //FINISH THIS ENDPOINT
    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetById(int id)
    {
        UserProfile userProfile = _dbContext
        .UserProfiles
        .Include(up => up.Events)
        .ThenInclude(e => e.EventServices)
        .ThenInclude(ev => ev.Service)
        .SingleOrDefault(up => up.Id == id);


        if (userProfile == null)
        {
            return NotFound();
        }

        return Ok(userProfile);
    }

    // [HttpPost("promote/{id}")]
    // [Authorize(Roles = "Admin")]
    // public IActionResult Promote(string id)
    // {
    //     IdentityRole role = _dbContext.Roles.SingleOrDefault(r => r.Name == "Admin");
    //     // This will create a new row in the many-to-many UserRoles table.
    //     _dbContext.UserRoles.Add(new IdentityUserRole<string>
    //     {
    //         RoleId = role.Id,
    //         UserId = id
    //     });
    //     _dbContext.SaveChanges();
    //     return NoContent();
    // }

    // [HttpPost("demote/{id}")]
    // [Authorize(Roles = "Admin")]
    // public IActionResult Demote(string id)
    // {
    //     IdentityRole role = _dbContext.Roles
    //         .SingleOrDefault(r => r.Name == "Admin"); 
    //     IdentityUserRole<string> userRole = _dbContext
    //         .UserRoles
    //         .SingleOrDefault(ur =>
    //             ur.RoleId == role.Id &&
    //             ur.UserId == id);

    //     _dbContext.UserRoles.Remove(userRole);
    //     _dbContext.SaveChanges();
    //     return NoContent();
    // }

}