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


}