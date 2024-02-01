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
public class ServiceController : ControllerBase
{
    private RasketsRimeDbContext _dbContext;

    public ServiceController(RasketsRimeDbContext context)
    {
        _dbContext = context;
    }
    [HttpGet]
    [Authorize]
    public IActionResult GetServices()
    {
        return Ok(_dbContext.Services
        .Include(s => s.VenueServices)
            .ThenInclude(vs => vs.Venue)
        .Select(s => new ServiceDTO
        {
            Id = s.Id,
            ServiceName = s.ServiceName,
            Description = s.Description,
            Price = s.Price,
            ImageUrl = s.ImageUrl,
            IsActive = s.IsActive,
            VenueServices = (List<VenueServiceDTO>)s.VenueServices.Select(vs => new VenueServiceDTO
            {
                Id = vs.Id,
                VenueId = vs.VenueId,
                Venue = new VenueDTO
                {
                    Id = vs.Venue.Id,
                    VenueName = vs.Venue.VenueName,
                    Address = vs.Venue.Address,
                    Description = vs.Venue.Description,
                    ContactInfo = vs.Venue.ContactInfo,
                    ImageUrl = vs.Venue.ImageUrl,
                    MaxOccupancy = vs.Venue.MaxOccupancy,
                    IsActive = vs.Venue.IsActive
                },
                ServiceId = vs.ServiceId
            }) 
           
        }).ToList());
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetById(int id)
    {
        var service = _dbContext.Services
            .Include(s => s.VenueServices)
                .ThenInclude(vs => vs.Venue)
                .SingleOrDefault(s => s.Id == id);

        if (service == null)
        {
            return NotFound();
        }
        
        var serviceDto = new ServiceDTO
        {
            Id = service.Id,
            ServiceName = service.ServiceName,
            Description = service.Description,
            Price = service.Price,
            ImageUrl = service.ImageUrl,
            IsActive = service.IsActive,
            VenueServices = service.VenueServices?.Select(vs => new VenueServiceDTO
            {
                Id = vs.Id,
                VenueId = vs.VenueId,
                Venue = new VenueDTO
                {
                    Id = vs.Venue.Id,
                    VenueName = vs.Venue.VenueName,
                    Address = vs.Venue.Address,
                    Description = vs.Venue.Description,
                    ContactInfo = vs.Venue.ContactInfo,
                    ImageUrl = vs.Venue.ImageUrl,
                    MaxOccupancy = vs.Venue.MaxOccupancy,
                    IsActive = vs.Venue.IsActive
                },
                ServiceId = vs.ServiceId
            }).ToList()
        };

        return Ok(serviceDto);
    }

[HttpGet("available/{venueId}")]
    [Authorize]
    public IActionResult GetAvailableServices(int venueId)
    {
        return Ok(_dbContext.Services
        .Where(s => s.VenueServices.Any(vs => vs.VenueId == venueId))
        .Include(s => s.VenueServices)
            .ThenInclude(vs => vs.Venue)
        .Select(s => new ServiceDTO
        {
            Id = s.Id,
            ServiceName = s.ServiceName,
            Description = s.Description,
            Price = s.Price,
            ImageUrl = s.ImageUrl,
            IsActive = s.IsActive,
             
           
        }).ToList());
    }


[HttpPost("create")]
[Authorize(Roles = "Admin")]

public IActionResult CreateService (ServiceCreationDTO serviceToCreate)
    {
        using (var transaction = _dbContext.Database.BeginTransaction())
        {
            try
            {
                var newService = new Service
                {
                    ServiceName = serviceToCreate.ServiceName,
                    Description = serviceToCreate.Description,
                    Price = serviceToCreate.Price,
                    ImageUrl = serviceToCreate.ImageUrl,
                    IsActive = serviceToCreate.IsActive
                };
                _dbContext.Services.Add(newService);
                _dbContext.SaveChanges();

                foreach (var venueId in serviceToCreate.VenueIds)
                {
                    var newVenueService = new VenueService
                    {
                        VenueId = venueId,
                        ServiceId = newService.Id
                    };
                    _dbContext.VenueServices.Add(newVenueService);
                }
                _dbContext.SaveChanges();
                transaction.Commit();
                return Ok(new
                {
                    Success = true,
                    Message = "Service Created Sucessfully",
                    ServiceId = newService.Id
                });
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return StatusCode(500, new{Error = "An error occured while creating service" + ex.Message });
            }
        }
    }
}