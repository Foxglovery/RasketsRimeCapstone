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
public class EventController : ControllerBase
{
    private RasketsRimeDbContext _dbContext;

    public EventController(RasketsRimeDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    //[Authorize]
    public IActionResult GetEvents()
    {
        var EventList = _dbContext
            .Events
            .Include(e => e.UserProfile)
                .ThenInclude(up => up.IdentityUser)
            .Include(e => e.EventServices)
                .ThenInclude(es => es.BookedService)
            .Select(e => new EventDTO
            {
                Id = e.Id,
                UserId = e.UserId,
                UserProfile = e.UserProfile != null ? new UserProfileDTO
                {
                    Id = e.UserProfile.Id,
                    FirstName = e.UserProfile.FirstName,
                    LastName = e.UserProfile.LastName,
                    Address = e.UserProfile.Address,
                    Email = e.UserProfile.IdentityUser.Email,
                    UserName = e.UserProfile.IdentityUser.UserName,
                    IsAdmin = e.UserProfile.IsAdmin,
                } : null,
                VenueId = e.VenueId,
                EventName = e.EventName,
                ExpectedAttendees = e.ExpectedAttendees,
                EventDescription = e.EventDescription,
                IsPublic = e.IsPublic,
                SubmitedOn = e.SubmitedOn,
                Status = e.Status,
                EventStart = e.EventStart,
                Duration = e.Duration,
                Venue = new VenueDTO
                {
                    Id = e.Venue.Id,
                    VenueName = e.Venue.VenueName,
                    Address = e.Venue.Address,
                    Description = e.Venue.Description,
                    ContactInfo = e.Venue.ContactInfo,
                    MaxOccupancy = e.Venue.MaxOccupancy,
                    IsActive = e.Venue.IsActive,
                },
                EventServices = e.EventServices.Select(es => new EventServiceDTO
                {
                    Id = es.Id,
                    EventId = es.EventId,
                    ServiceId = es.ServiceId,
                    BookedService = new ServiceDTO
                    {
                        Id = es.BookedService.Id,
                        ServiceName = es.BookedService.ServiceName,
                        Description = es.BookedService.Description,
                        Price = es.BookedService.Price,
                        IsActive = es.BookedService.IsActive
                    }

                }).ToList()

            }).ToList();

        return Ok(EventList);
    }

}