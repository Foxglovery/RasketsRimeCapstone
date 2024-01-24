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
                .ThenInclude(es => es.Service)
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
                    Service = new ServiceDTO
                    {
                        Id = es.Service.Id,
                        ServiceName = es.Service.ServiceName,
                        Description = es.Service.Description,
                        Price = es.Service.Price,
                        IsActive = es.Service.IsActive
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
                .ThenInclude(es => es.Service)
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
                Service = es.Service != null ? new ServiceDTO
                {
                    Id = es.Service.Id,
                    ServiceName = es.Service.ServiceName,
                    Description = es.Service.Description,
                    Price = es.Service.Price,
                    IsActive = es.Service.IsActive
                } : null

            }).ToList() ?? new List<EventServiceDTO>()

        };
        return Ok(eventDto);
    }

 [HttpGet("user/{userId}")]
//[Authorize]
public IActionResult GetByUserId(int userId)
{
    var events = _dbContext.Events
        .Where(e => e.UserId == userId)
        .Include(e => e.UserProfile)
            .ThenInclude(up => up.IdentityUser)
        .Include(e => e.Venue)
        .Include(e => e.EventServices)
            .ThenInclude(es => es.Service)
        .ToList();

    if (events == null || events.Count == 0)
    {
        return NotFound();
    }

    var eventDtos = events.Select(eventInstance => new EventDTO
    {
        Id = eventInstance.Id,
        UserId = eventInstance.UserId,
        UserProfile = eventInstance.UserProfile != null ? new UserProfileDTO
        {
            Id = eventInstance.UserProfile.Id,
            FirstName = eventInstance.UserProfile.FirstName,
            LastName = eventInstance.UserProfile.LastName,
            Address = eventInstance.UserProfile.Address,
            Email = eventInstance.UserProfile.IdentityUser?.Email,
            UserName = eventInstance.UserProfile.IdentityUser?.UserName,
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
        Venue = eventInstance.Venue != null ? new VenueDTO
        {
            Id = eventInstance.Venue.Id,
            VenueName = eventInstance.Venue.VenueName,
            Address = eventInstance.Venue.Address,
            Description = eventInstance.Venue.Description,
            ContactInfo = eventInstance.Venue.ContactInfo,
            MaxOccupancy = eventInstance.Venue.MaxOccupancy,
            IsActive = eventInstance.Venue.IsActive,
        } : null,
        EventServices = eventInstance.EventServices?.Select(es => new EventServiceDTO
        {
            Id = es.Id,
            EventId = es.EventId,
            ServiceId = es.ServiceId,
            Service = es.Service != null ? new ServiceDTO
            {
                Id = es.Service.Id,
                ServiceName = es.Service.ServiceName,
                Description = es.Service.Description,
                Price = es.Service.Price,
                IsActive = es.Service.IsActive
            } : null
        }).ToList() ?? new List<EventServiceDTO>()
    }).ToList();

    return Ok(eventDtos);
}


    [HttpPost]
    //[Authorize]
    public IActionResult CreateEvent(EventCreationDTO eventToCreate)
    {
        using (var transaction = _dbContext.Database.BeginTransaction())
        {
            try
            {
                var venue = _dbContext.Venues.SingleOrDefault(v => v.Id == eventToCreate.VenueId);
                if (venue == null)
                {
                    return BadRequest("This venue does not exist");
                }
                if (eventToCreate.ExpectedAttendees > venue.MaxOccupancy)
                {
                    return BadRequest($"The new venue cannot accommodate this number of people. The limit for this venue is {venue.MaxOccupancy}");
                }
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
                    else
                    {
                        return BadRequest($"This service(Id:{serviceId}) is not available at this venue");
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
//will complete logic to update eventServices too
    [HttpPut("{id}")]
    //[Authorize]
    public IActionResult UpdateEvent(int id, [FromBody] UpdateEventDTO newEvent)
    {
        var eventToUpdate = _dbContext.Events
        .Include(e => e.EventServices)
        .FirstOrDefault(e => e.Id == id);

    if (eventToUpdate == null)
    {
        return NotFound();
    }   
        //did they enter a valid number of expected people?
        var newVenue = _dbContext.Venues
            .SingleOrDefault(v => v.Id == newEvent.VenueId);
        if (newEvent.ExpectedAttendees > newVenue.MaxOccupancy)
        {
            return BadRequest($"The new venue cannot accommodate this number of people. The limit for this venue is {newVenue.MaxOccupancy}");
        }
        //does this venue exist?
        var venueExists = _dbContext.Venues.Any(v => v.Id == newEvent.VenueId);
        if (!venueExists)
        {
            return BadRequest("Venue not found.");
        }
        //Are those services even available at the new venue?
        var availableServiceIdsAtVenue = _dbContext.VenueServices
            .Where(vs => vs.VenueId == newEvent.VenueId)
            .Select(vs => vs.ServiceId)
            .ToList();
        
        //check the new event for  serviceids that are not on the new venueService table
        var invalidServices = newEvent.ServiceIds
            .Where(sid => !availableServiceIdsAtVenue.Contains(sid))
            .ToList();
        
        if (invalidServices.Any())
        {
            return BadRequest($"The following service Ids are not available at the chosen venue: {string.Join(",", invalidServices)}");
        }
        eventToUpdate.VenueId = newEvent.VenueId;
        eventToUpdate.EventName = newEvent.EventName;
        eventToUpdate.ExpectedAttendees = newEvent.ExpectedAttendees;
        eventToUpdate.EventDescription = newEvent.EventDescription;
        eventToUpdate.EventStart = newEvent.EventStart;
        eventToUpdate.Duration = newEvent.Duration;

        eventToUpdate.EventServices.Clear();
        foreach (var serviceId in newEvent.ServiceIds)
        {
            eventToUpdate.EventServices.Add(new EventService
            {
                EventId = id,
                ServiceId = serviceId
            });
        }
        
        _dbContext.SaveChanges();
        return Ok(eventToUpdate);
    }
[HttpGet("pending")]
//[Authorize(Roles = "Admin")]
public IActionResult GetPending()
{
    var PendingList = _dbContext
            .Events
            .Where(e => e.Status == "Pending")
            .Include(e => e.UserProfile)
                .ThenInclude(up => up.IdentityUser)
            .Include(e => e.EventServices)
                .ThenInclude(es => es.Service)
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
                    Service = new ServiceDTO
                    {
                        Id = es.Service.Id,
                        ServiceName = es.Service.ServiceName,
                        Description = es.Service.Description,
                        Price = es.Service.Price,
                        IsActive = es.Service.IsActive
                    }

                }).ToList()

            }).ToList();
          

            return Ok(PendingList);
}

[HttpPost("approve/{id}")]
//[Authorize(Roles = "Admin")]
public IActionResult ApproveEvent(int id)
{
    var eventToApprove = _dbContext.Events.SingleOrDefault(e => e.Id == id);
    if (eventToApprove == null)
    {
        return NotFound();
    }
    eventToApprove.Status = "Approved";
    _dbContext.SaveChanges();
    return Ok("Event approval successful");

}

[HttpPost("AdminCancel/{id}")]
//[Authorize(Roles = "Admin")]
public IActionResult AdminCancelEvent(int id)
{
    var eventToCancel = _dbContext.Events.SingleOrDefault(e => e.Id == id);
    if (eventToCancel == null)
    {
        return NotFound();
    }
    eventToCancel.Status = "Canceled";
    _dbContext.SaveChanges();
    return Ok("Event cancellation successful");

}
[HttpPost("UserCancel/{eventId}")]
//[Authorize]
public IActionResult UserCancelEvent(int eventId, int userId)
{
    var eventToCancel = _dbContext.Events.SingleOrDefault(e => e.Id == eventId && e.UserId == userId);
    if (eventToCancel == null)
    {
        return NotFound();
    }
    eventToCancel.Status = "Canceled";
    _dbContext.SaveChanges();
    return Ok("Event cancellation successful");

}


}