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
                EventStart = TimeZoneInfo.ConvertTimeFromUtc(e.EventStart, TimeZoneInfo.Local),
                Duration = e.Duration,
                Venue = new VenueDTO
                {
                    Id = e.Venue.Id,
                    VenueName = e.Venue.VenueName,
                    Address = e.Venue.Address,
                    Description = e.Venue.Description,
                    ContactInfo = e.Venue.ContactInfo,
                    ImageUrl = e.Venue.ImageUrl,
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

    [HttpGet("venue/{id}")]
    //[Authorize]
    public IActionResult GetEventsByVenueId(int id)
    {
        var EventList = _dbContext
            .Events
            .Where(e => e.Venue.Id == id)
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
                EventStart = TimeZoneInfo.ConvertTimeFromUtc(e.EventStart, TimeZoneInfo.Local),
                Duration = e.Duration,
                Venue = new VenueDTO
                {
                    Id = e.Venue.Id,
                    VenueName = e.Venue.VenueName,
                    Address = e.Venue.Address,
                    Description = e.Venue.Description,
                    ContactInfo = e.Venue.ContactInfo,
                    ImageUrl = e.Venue.ImageUrl,
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
    [HttpGet("service/{id}")]
    //[Authorize]
    public IActionResult GetEventsByServiceId(int id)
    {
        var EventList = _dbContext
            .Events
            .Include(e => e.UserProfile)
                .ThenInclude(up => up.IdentityUser)
            .Include(e => e.EventServices)
                .ThenInclude(es => es.Service)
                .Where(e => e.EventServices.Any(es => es.ServiceId == id))
                .OrderBy(e => e.EventStart)
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
                EventStart = TimeZoneInfo.ConvertTimeFromUtc(e.EventStart, TimeZoneInfo.Local),
                Duration = e.Duration,
                Venue = new VenueDTO
                {
                    Id = e.Venue.Id,
                    VenueName = e.Venue.VenueName,
                    Address = e.Venue.Address,
                    Description = e.Venue.Description,
                    ContactInfo = e.Venue.ContactInfo,
                    ImageUrl = e.Venue.ImageUrl,
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

    [HttpGet("upcoming")]
    //[Authorize]
    public IActionResult GetUpcomingEvents()
    {
        var EventList = _dbContext
            .Events
            .Where(e => e.EventStart > DateTime.UtcNow && e.Status == "Approved")
            .OrderBy(e => e.EventStart)
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
                EventStart = TimeZoneInfo.ConvertTimeFromUtc(e.EventStart, TimeZoneInfo.Local),
                Duration = e.Duration,
                Venue = new VenueDTO
                {
                    Id = e.Venue.Id,
                    VenueName = e.Venue.VenueName,
                    Address = e.Venue.Address,
                    Description = e.Venue.Description,
                    ContactInfo = e.Venue.ContactInfo,
                    ImageUrl = e.Venue.ImageUrl,
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
            SubmitedOn = TimeZoneInfo.ConvertTimeFromUtc((DateTime)eventInstance.SubmitedOn, TimeZoneInfo.Local),
            Status = eventInstance.Status,
            EventStart = TimeZoneInfo.ConvertTimeFromUtc(eventInstance.EventStart, TimeZoneInfo.Local),
            Duration = eventInstance.Duration,
            Venue = new VenueDTO
            {
                Id = eventInstance.Venue.Id,
                VenueName = eventInstance.Venue.VenueName,
                Address = eventInstance.Venue.Address,
                Description = eventInstance.Venue.Description,
                ContactInfo = eventInstance.Venue.ContactInfo,
                ImageUrl = eventInstance.Venue.ImageUrl,
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
        EventStart = TimeZoneInfo.ConvertTimeFromUtc(eventInstance.EventStart, TimeZoneInfo.Local),
        Duration = eventInstance.Duration,
        Venue = eventInstance.Venue != null ? new VenueDTO
        {
            Id = eventInstance.Venue.Id,
            VenueName = eventInstance.Venue.VenueName,
            Address = eventInstance.Venue.Address,
            Description = eventInstance.Venue.Description,
            ContactInfo = eventInstance.Venue.ContactInfo,
            ImageUrl = eventInstance.Venue.ImageUrl,
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
                DateTime newEventEndTime = eventToCreate.EventStart.AddHours(eventToCreate.Duration);
                //look for conflicts
                var conflictingEvents = _dbContext.Events
                .Where(e => e.VenueId == eventToCreate.VenueId
                        && e.Status == "Approved" 
                         && ((e.EventStart < newEventEndTime && e.EventStart.AddHours(e.Duration) > eventToCreate.EventStart)
                             || (eventToCreate.EventStart < e.EventStart.AddHours(e.Duration) && newEventEndTime > e.EventStart)))
                .ToList();
                //if conflicts exist, then bad request
                if (conflictingEvents.Any())
                {
                    return BadRequest(new {Error = "This venue is already booked for this time slot."});
                }
                var venue = _dbContext.Venues.SingleOrDefault(v => v.Id == eventToCreate.VenueId);
                if (venue == null)
                {
                    return BadRequest(new {Error = "This venue does not exist"});
                }
                if (eventToCreate.ExpectedAttendees > venue.MaxOccupancy)
                {
                    return BadRequest(new {Error = $"The new venue cannot accommodate this number of people. The limit for this venue is {venue.MaxOccupancy}"});
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
                    SubmitedOn = TimeZoneInfo.ConvertTimeToUtc(DateTime.Now),
                    Status = "Pending",
                    EventStart = TimeZoneInfo.ConvertTimeToUtc(eventToCreate.EventStart),
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
                        return BadRequest(new {Error = $"This service(Id:{serviceId}) is not available at this venue"});
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
                return StatusCode(500, new {Error = "An error occured while creating event."} );
            }
        }
    }
//will complete logic to update eventServices too
    [HttpPut("{id}")]
    [Authorize]
    public IActionResult UpdateEvent(int id, [FromBody] AdminUpdateEventDTO newEvent)
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
        eventToUpdate.EventStart = TimeZoneInfo.ConvertTimeToUtc(newEvent.EventStart);
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

[HttpGet("update/{id}")]
//[Authorize]
public IActionResult GetEventForUpdate(int id)
{
    var eventInstance = _dbContext.Events
        .Include(e => e.UserProfile)
                .ThenInclude(up => up.IdentityUser)
        .Include(e => e.Venue)
        .Include(e => e.EventServices)
                .ThenInclude(es => es.Service)
                .SingleOrDefault(e => e.Id == id);
    
    var serviceIds = eventInstance.EventServices.Select(es => es.ServiceId).ToList();

        if (eventInstance == null)
        {
            return NotFound();
        }
        var updateEventDto = new UpdateEventDTO
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
            EventStart = TimeZoneInfo.ConvertTimeFromUtc(eventInstance.EventStart, TimeZoneInfo.Local),
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

            }).ToList() ?? new List<EventServiceDTO>(),
            ServiceIds = serviceIds
        };

        return Ok(updateEventDto);
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

[HttpPut("approve/{id}")]
//[Authorize(Roles = "Admin")]
public IActionResult ApproveEvent(int id)
{
    var eventToApprove = _dbContext.Events.SingleOrDefault(e => e.Id == id);
    
     DateTime eventEndTime = eventToApprove.EventStart.AddHours(eventToApprove.Duration);

            // Fetch conflicting events (only considering approved events)
            var conflictingEvents = _dbContext.Events
                .Where(e => e.VenueId == eventToApprove.VenueId 
                         && e.Status == "Approved"
                         && e.Id != id // Exclude the current event
                         && ((e.EventStart < eventEndTime && e.EventStart.AddHours(e.Duration) > eventToApprove.EventStart)
                             || (eventToApprove.EventStart < e.EventStart.AddHours(e.Duration) && eventEndTime > e.EventStart)))
                .ToList();

    if (eventToApprove == null)
    {
        return NotFound();
    }
    eventToApprove.Status = "Approved";
    _dbContext.SaveChanges();
    return Ok("Event approval successful");

}
[HttpPut("reject/{id}")]
//[Authorize(Roles = "Admin")]
public IActionResult RejectEvent(int id)
{
    var eventToReject = _dbContext.Events.SingleOrDefault(e => e.Id == id);
    if (eventToReject == null)
    {
        return NotFound();
    }
    eventToReject.Status = "Rejected";
    _dbContext.SaveChanges();
    return Ok("Event rejection successful");

}

[HttpPut("AdminCancel/{id}")]
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
[HttpPut("UserCancel/{eventId}")]
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

[HttpDelete("{id}")]
//[Authorize(Rolls = "Admin")]
public IActionResult DeleteEvent(int id)
{
    Event eventToDelete = _dbContext.Events.SingleOrDefault(e => e.Id == id);
    if (eventToDelete == null)
    {
        return NotFound();
    }
    _dbContext.Events.Remove(eventToDelete);
    _dbContext.SaveChanges();
    return Ok("Event deletion successful");
}

}