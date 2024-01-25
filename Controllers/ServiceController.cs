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
    //[Authorize]
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
                    MaxOccupancy = vs.Venue.MaxOccupancy,
                    IsActive = vs.Venue.IsActive
                },
                ServiceId = vs.ServiceId
            }) 
           
        }).ToList());
    }

    [HttpGet("{id}")]
    //[Authorize]
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
                    MaxOccupancy = vs.Venue.MaxOccupancy,
                    IsActive = vs.Venue.IsActive
                },
                ServiceId = vs.ServiceId
            }).ToList()
        };

        return Ok(serviceDto);
    }
}