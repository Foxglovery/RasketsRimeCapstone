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

    [HttpGet("{id}")]
    //[Authorize]
    public IActionResult GetByEventId(int id)
    {
        var eventInstance = _dbContext.Events
        .Include(e => e.UserProfile)
                .ThenInclude(up => up.IdentityUser)
        .Include(e => e.Venue)
        .Include(e => e.EventServices)
                .ThenInclude(es => es.BookedService)
                .SingleOrDefault(e => e.Id == id);
        if (eventInstance == null)
        {
            return NotFound();
        }
        var eventDto = new EventDTO
        {
            Id = eventInstance.Id,
            UserId = eventInstance.UserId,
            UserProfile = eventInstance.UserProfile != null ? new UserProfileDTO
            {
                Id = eventInstance.UserProfile.Id,
                FirstName = eventInstance.UserProfile.FirstName,
                LastName = eventInstance.UserProfile.LastName,
                Address = eventInstance.UserProfile.Address,
                Email = eventInstance.UserProfile.IdentityUser.Email,
                UserName = eventInstance.UserProfile.IdentityUser.UserName,
                IsAdmin = eventInstance.UserProfile.IsAdmin,
            } : null,
            VenueId = eventInstance.VenueId,
            EventName = eventInstance.EventName,
            ExpectedAttendees = eventInstance.ExpectedAttendees,
            EventDescription = eventInstance.EventDescription,
            IsPublic = eventInstance.IsPublic,
            SubmitedOn = eventInstance.SubmitedOn,
            Status = eventInstance.Status,
            EventStart = eventInstance.EventStart,
            Duration = eventInstance.Duration,
            Venue = new VenueDTO
            {
                Id = eventInstance.Venue.Id,
                VenueName = eventInstance.Venue.VenueName,
                Address = eventInstance.Venue.Address,
                Description = eventInstance.Venue.Description,
                ContactInfo = eventInstance.Venue.ContactInfo,
                MaxOccupancy = eventInstance.Venue.MaxOccupancy,
                IsActive = eventInstance.Venue.IsActive,
            },
            EventServices = eventInstance.EventServices?.Select(es => new EventServiceDTO
            {
                Id = es.Id,
                EventId = es.EventId,
                ServiceId = es.ServiceId,
                BookedService = es.BookedService != null ? new ServiceDTO
                {
                    Id = es.BookedService.Id,
                    ServiceName = es.BookedService.ServiceName,
                    Description = es.BookedService.Description,
                    Price = es.BookedService.Price,
                    IsActive = es.BookedService.IsActive
                } : null

            }).ToList() ?? new List<EventServiceDTO>()

        };
        return Ok(eventDto);
    }

    [HttpGet("user/{userId}")]
    //[Authorize]
    public IActionResult GetByUserId(int userId)
    {
        var eventInstance = _dbContext.Events
            .Include(e => e.UserProfile)
                    .ThenInclude(up => up.IdentityUser)
            .Include(e => e.Venue)
            .Include(e => e.EventServices)
                    .ThenInclude(es => es.BookedService)
                    .SingleOrDefault(e => e.UserId == userId);
        if (eventInstance == null)
        {
            return NotFound();
        }
        var eventDto = new EventDTO
        {
            Id = eventInstance.Id,
            UserId = eventInstance.UserId,
            UserProfile = eventInstance.UserProfile != null ? new UserProfileDTO
            {
                Id = eventInstance.UserProfile.Id,
                FirstName = eventInstance.UserProfile.FirstName,
                LastName = eventInstance.UserProfile.LastName,
                Address = eventInstance.UserProfile.Address,
                Email = eventInstance.UserProfile.IdentityUser.Email,
                UserName = eventInstance.UserProfile.IdentityUser.UserName,
                IsAdmin = eventInstance.UserProfile.IsAdmin,
            } : null,
            VenueId = eventInstance.VenueId,
            EventName = eventInstance.EventName,
            ExpectedAttendees = eventInstance.ExpectedAttendees,
            EventDescription = eventInstance.EventDescription,
            IsPublic = eventInstance.IsPublic,
            SubmitedOn = eventInstance.SubmitedOn,
            Status = eventInstance.Status,
            EventStart = eventInstance.EventStart,
            Duration = eventInstance.Duration,
            Venue = new VenueDTO
            {
                Id = eventInstance.Venue.Id,
                VenueName = eventInstance.Venue.VenueName,
                Address = eventInstance.Venue.Address,
                Description = eventInstance.Venue.Description,
                ContactInfo = eventInstance.Venue.ContactInfo,
                MaxOccupancy = eventInstance.Venue.MaxOccupancy,
                IsActive = eventInstance.Venue.IsActive,
            },
            EventServices = eventInstance.EventServices?.Select(es => new EventServiceDTO
            {
                Id = es.Id,
                EventId = es.EventId,
                ServiceId = es.ServiceId,
                BookedService = es.BookedService != null ? new ServiceDTO
                {
                    Id = es.BookedService.Id,
                    ServiceName = es.BookedService.ServiceName,
                    Description = es.BookedService.Description,
                    Price = es.BookedService.Price,
                    IsActive = es.BookedService.IsActive
                } : null

            }).ToList() ?? new List<EventServiceDTO>()

        };
        return Ok(eventDto);
    }


    [HttpPost]
    //[Authorize]
    public IActionResult CreateEvent(EventCreationDTO eventToCreate)
    {
        using (var transaction = _dbContext.Database.BeginTransaction())
        {
            try
            {
                var serviceList = _dbContext.VenueServices.Where(es => es.VenueId == eventToCreate.VenueId).ToList();
                var newEvent = new Event
                {
                    UserId = eventToCreate.UserId,
                    VenueId = eventToCreate.VenueId,
                    EventName = eventToCreate.EventName,
                    ExpectedAttendees = eventToCreate.ExpectedAttendees,
                    EventDescription = eventToCreate.EventDescription,
                    IsPublic = eventToCreate.IsPublic,
                    SubmitedOn = DateTime.Now,
                    Status = "Pending",
                    EventStart = eventToCreate.EventStart,
                    Duration = eventToCreate.Duration
                };

                _dbContext.Events.Add(newEvent);
                _dbContext.SaveChanges();

                foreach (var serviceId in eventToCreate.ServiceIds)
                {
                    var newEventService = new EventService
                    {
                        EventId = newEvent.Id,
                        ServiceId = serviceId
                    };

                    if (serviceList.Any(sl => sl.ServiceId == serviceId))
                    {
                        _dbContext.EventServices.Add(newEventService);
                    }
                    

                }
                _dbContext.SaveChanges();
                transaction.Commit();
                return Ok(new
                {
                    Success = true,
                    Message = "Event Created Successfully",
                    EventId = newEvent.Id
                });
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return StatusCode(500, "An error occured while creating event.");
            }
        }
    }


}