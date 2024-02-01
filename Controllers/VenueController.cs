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
public class VenueController : ControllerBase
{
    private RasketsRimeDbContext _dbContext;

    public VenueController(RasketsRimeDbContext context)
    {
        _dbContext = context;
    }
[HttpGet]
[Authorize]
public IActionResult GetVenues()
{
    return Ok(_dbContext.Venues
        .Include(v => v.VenueServices)
            .ThenInclude(vs => vs.Service)
            .Select(v => new VenueDTO
            {
                Id = v.Id,
                VenueName = v.VenueName,
                Address = v.Address,
                Description = v.Description,
                ContactInfo = v.ContactInfo,
                ImageUrl = v.ImageUrl,
                MaxOccupancy = v.MaxOccupancy,
                IsActive = v.IsActive,
                VenueServices = (List<VenueServiceDTO>)v.VenueServices.Select(vs => new VenueServiceDTO
                {
                    Id = vs.Id,
                    VenueId = vs.VenueId,
                    ServiceId = vs.ServiceId,
                    Service = new ServiceDTO
                    {
                        Id = vs.Service.Id,
                        ServiceName = vs.Service.ServiceName,
                        Description = vs.Service.Description,
                        Price = vs.Service.Price,
                        ImageUrl = vs.Service.ImageUrl,
                        IsActive = vs.Service.IsActive
                    }
                })
            }).ToList());
}

[HttpGet("{id}")]
[Authorize]
public IActionResult GetById(int id)
{
    var venue = _dbContext.Venues
        .Include(v => v.VenueServices)
            .ThenInclude(vs => vs.Service)
            .SingleOrDefault(v => v.Id == id);
    if (venue == null)
    {
        return NotFound();
    }

            var venueDto = new VenueDTO
            {
                Id = venue.Id,
                VenueName = venue.VenueName,
                Address = venue.Address,
                Description = venue.Description,
                ContactInfo = venue.ContactInfo,
                ImageUrl = venue.ImageUrl,
                MaxOccupancy = venue.MaxOccupancy,
                IsActive = venue.IsActive,
                VenueServices = (List<VenueServiceDTO>)venue.VenueServices.Select(vs => new VenueServiceDTO
                {
                    Id = vs.Id,
                    VenueId = vs.VenueId,
                    ServiceId = vs.ServiceId,
                    Service = new ServiceDTO
                    {
                        Id = vs.Service.Id,
                        ServiceName = vs.Service.ServiceName,
                        Description = vs.Service.Description,
                        Price = vs.Service.Price,
                        ImageUrl = vs.Service.ImageUrl,
                        IsActive = vs.Service.IsActive
                    }
                }).ToList()
            };

            return Ok(venueDto);
}

[HttpPost]
[Authorize(Roles = "Admin")]

public IActionResult CreateVenue (VenueCreationDTO venueToCreate)
{
    using (var transaction = _dbContext.Database.BeginTransaction())

    try
    {
        var newVenue = new Venue
        {
            VenueName = venueToCreate.VenueName,
            Address = venueToCreate.Address,
            Description = venueToCreate.Description,
            ContactInfo = venueToCreate.ContactInfo,
            ImageUrl = venueToCreate.ImageUrl,
            MaxOccupancy = venueToCreate.MaxOccupancy,
            IsActive = venueToCreate.IsActive
        };
        _dbContext.Venues.Add(newVenue);
        _dbContext.SaveChanges();

        foreach (var serviceId in venueToCreate.ServiceIds)
        {
            var newVenueService = new VenueService
            {
                VenueId = newVenue.Id,
                ServiceId = serviceId
            };
            _dbContext.VenueServices.Add(newVenueService);
        }
        _dbContext.SaveChanges();
        transaction.Commit();
        return Ok(new
        {
            Success = true,
            Message = "Venue Created Successfully",
            VenueId = newVenue.Id
        });
    }
    catch (Exception ex)
    {
        transaction.Rollback();
        return StatusCode(500, new{Error = "An error occured while creating venue" + ex.Message});
    }
}

[HttpPut("{id}")]
[Authorize(Roles = "Admin")]
public IActionResult UpdateVenue(int id, [FromBody] UpdateVenueDTO newVenue)
{
    var venueToUpdate = _dbContext.Venues
        .Include(v => v.VenueServices)
        .SingleOrDefault(v => v.Id == id);

    if (venueToUpdate == null)
    {
        return NotFound();
    }

    if (newVenue.MaxOccupancy < venueToUpdate.MaxOccupancy)
    {
        var affectedEvents = _dbContext.Events
            .Where(e => e.VenueId == id && e.ExpectedAttendees > newVenue.MaxOccupancy && e.EventStart >= DateTime.Now)
            .ToList();
        if (affectedEvents.Any())
        {
            return BadRequest("Updating the venue's capacity will affect already booked events. Consult the the handbook");
        }
    }



    venueToUpdate.VenueName = newVenue.VenueName;
    venueToUpdate.Address = newVenue.Address;
    venueToUpdate.Description = newVenue.Description;
    venueToUpdate.IsActive = newVenue.IsActive;
    venueToUpdate.ImageUrl = newVenue.ImageUrl;
    venueToUpdate.ContactInfo = newVenue.ContactInfo;
    venueToUpdate.MaxOccupancy = newVenue.MaxOccupancy;
    
    venueToUpdate.VenueServices.Clear();
    foreach (var serviceId in newVenue.ServiceIds)
    {
        if (!_dbContext.Services.Any(s => s.Id == serviceId))
        {
            return BadRequest($"Service with ID {serviceId} does not exist.");
        }
        venueToUpdate.VenueServices.Add(new VenueService
        {
            VenueId = venueToUpdate.Id,
            ServiceId = serviceId
        });
    }
    try
    {
       _dbContext.SaveChanges(); 
    }
    catch (Exception ex)
    {
        return StatusCode(500, "An error occurred while updating the venue" + ex.Message);
    }
    
    return Ok(venueToUpdate);
}


}