using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using RasketsRime.Models;
using Microsoft.AspNetCore.Identity;

namespace RasketsRime.Data;
public class RasketsRimeDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;

    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Event> Events { get; set; }
    public DbSet<EventService> EventServices { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<Venue> Venues { get; set; }
    public DbSet<VenueService> VenueServices { get; set; }

    public RasketsRimeDbContext(DbContextOptions<RasketsRimeDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        //rolls available
        //only adding 1 so I dont need the bracket to indicate an array of IdentityRoles
        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });
        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {

            Id = "a601c402-545f-4ba8-869d-6f0968774d58",
            Name = "User",
            NormalizedName = "user"
        });
        //User info with login credentials
        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admin@neopets.com",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });
        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "e2731372-eb45-4cc5-9a34-d9711f3642b2",
            UserName = "Schlebethany",
            Email = "Schlebethany@neopets.com",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });
        //join table of user roles with users
        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "a601c402-545f-4ba8-869d-6f0968774d58",
            UserId = "e2731372-eb45-4cc5-9a34-d9711f3642b2"
        });
        // modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        // {
        //     Id = 1,
        //     IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
        //     FirstName = "Admina",
        //     LastName = "Strator",
        //     Address = "101 Main Street",
        // });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile[]
        {
            new UserProfile
            {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Admina",
            LastName = "Strator",
            Address = "101 Main Street",
            IsAdmin = true,
            ProfileImage = "https://i.pinimg.com/564x/c0/fd/d7/c0fdd735d4db94c60866e43e44ae98cf.jpg"
            },
            new UserProfile
            {
                Id = 2,
                IdentityUserId = "e2731372-eb45-4cc5-9a34-d9711f3642b2",
                FirstName = "Schlebethany",
                LastName = "Pleasance",
                Address = "222 N Sidereal Way",
                IsAdmin = false,
                ProfileImage = "https://beta.creativecirclecdn.com/timberjay/original/20210127-160305-1.29%20weasel%20looks.tif.jpg" 
            }
        });
        modelBuilder.Entity<Venue>().HasData(new Venue[]
        {
            new Venue
            {
            Id = 1,
            VenueName = "The Unmoored University",
            Address = "19 Under Lake Blvd",
            Description = "A prestigious arcane academy lovingly nestled beneath the central lake of the town. Its atrium is more than accommodating for crowds large and small.",
            ContactInfo = "Arbiter Darling : 850-474-5555",
            ImageUrl = "https://images2.imgbox.com/77/31/cpoSEOJg_o.jpg",
            MaxOccupancy = 300,
            IsActive = true
            },
            new Venue
            {
            Id = 2,
            VenueName = "Mountain-Top Radio Station",
            Address = "327 Rumbler Route Way",
            Description = "From atop the mountains, the radio station glows eternal. Deceptively large, its unassuming facade belies the many cozy suites nestled within its walls.",
            ContactInfo = "Foxglove Mackenzie -- 850-985-2934",
            ImageUrl = "https://images2.imgbox.com/77/31/cpoSEOJg_o.jpg",
            MaxOccupancy = 85,
            IsActive = true
            },
            new Venue
            {
            Id = 3,
            VenueName = "Cedrine Forest Adirondack",
            Address = "667 W Rambling Road",
            Description = "The warmth and glow of the Cedrine trees provides a lovely backdrop for any event. Weather can be controlled from inside. Many a night has been spent taking in the thrum of the woods under a revelry-drunk moon.",
            ContactInfo = "Thorely Goodparty",
            ImageUrl = "https://images2.imgbox.com/77/31/cpoSEOJg_o.jpg",
            MaxOccupancy = 50,
            IsActive = true
            },
            new Venue
            {
            Id = 4,
            VenueName = "Glinterland Cathedral Hall",
            Address = "3762 Gnomiad Fork",
            Description = "Believe it or not, this was never a cathedral. The creator instead saw fit to erect this behemoth of architectural ego on top of the abandoned Goofy Golf complex. Vestigial dinosaurs and aliens still linger where you would least expect them.",
            ContactInfo = "Parker Billian -- 850-987-2926",
            ImageUrl = "https://images2.imgbox.com/77/31/cpoSEOJg_o.jpg",
            MaxOccupancy = 200,
            IsActive = true
            },
            new Venue
            {
            Id = 5,
            VenueName = "Madame Zostra's Family Fun Time Seance Parlor",
            Address = "3 Nestledown Thicket",
            Description = "Ambience and incense will greet you as you settle in. On display are the relics and spoils of war won by Madame Zostra in her pursuit of the Thaumaturgical Arts",
            ContactInfo = "Madame Zostra -- 850-222-1053",
            ImageUrl = "https://images2.imgbox.com/77/31/cpoSEOJg_o.jpg",
            MaxOccupancy = 20,
            IsActive = true
            },
            new Venue
            {
            Id = 6,
            VenueName = "The Patty Lupone Groupon Coupon Main Stage",
            Address = "5590 Fingerpail Row",
            Description = "Much like its namesake, this amphitheatre is beloved and commands your attention. Excellent acoustics make for a wonderful way to talk/sing at your audience.  ",
            ContactInfo = "Maisel Darby --850-334-9010",
            ImageUrl = "https://images2.imgbox.com/77/31/cpoSEOJg_o.jpg",
            MaxOccupancy = 500,
            IsActive = true
            }
        });

        modelBuilder.Entity<Service>().HasData(new Service[]
        {
            new Service
            {
                Id = 1,
                ServiceName = "Trash-Pickup",
                Description = "We will pick up your trash, but we won't be happy about it.",
                Price = 60,
                ImageUrl = "https://images2.imgbox.com/de/f8/lvuIZQr2_o.png",
                IsActive = true
            },
            new Service
            {
                Id = 2,
                ServiceName = "Smoothie-Bar",
                Description = "Pitaya, Pineapple, Mango...You name it, we will throw it in a bucket and blend it till its oh-so smooth.",
                Price = 100,
                ImageUrl = "https://images2.imgbox.com/4d/f0/043VF0mx_o.png",
                IsActive = true
            },
            new Service
            {
                Id = 3,
                ServiceName = "Security (By The Arbiter's Secret Militia)",
                Description = "If your wondering who will be providing security, chances are you've already met them and they were likely not impressed. Ever watchful, they do not rest.",
                Price = 100,
                ImageUrl = "https://images2.imgbox.com/e4/b8/b4yyisFh_o.jpg",
                IsActive = true
            },
            new Service
            {
                Id = 4,
                ServiceName = "Child-Care (Also By The Arbiter's Secret Militia)",
                Description = "Just because a shadowy organization strong-armed our town into a monopoly on security services does NOT mean they don't make excellent caregivers.",
                Price = 200,
                ImageUrl = "https://images2.imgbox.com/ad/8e/rvA5aOH5_o.png",
                IsActive = true
            },
            new Service
            {
                Id = 5,
                ServiceName = "Valet-Lake Parking",
                Description = "Look, the University is under the lake. You want to try your hand at getting your car out yourself? Go ahead.",
                Price = 50,
                ImageUrl = "https://images2.imgbox.com/7e/51/IyDxqLiR_o.png",
                IsActive = true
            },
            new Service
            {
                Id = 6,
                ServiceName = "Library 'Supermarket Sweep'",
                Description = "We will let you shove as many books as you can fit in a burlap sac from the 'donated' stacks. We are not responsible for what these books may or may not do upon reading. ",
                Price = 800,
                ImageUrl = "https://images2.imgbox.com/ad/9c/Cee2RDsS_o.png",
                IsActive = true
            },
            new Service
            {
                Id = 7,
                ServiceName = "Mobile Heat Censors",
                Description = "It gets cold here. These floating bowls of heat will warm your guests. Be sure you do not put ANYTHING in the censor. Again we cannot stress that enough.",
                Price = 20,
                ImageUrl = "https://images2.imgbox.com/ef/56/n2BD5zlx_o.png",
                IsActive = true
            },
            new Service
            {
                Id = 8,
                ServiceName = "Mountain-Top Ski Lift",
                Description = "You really do not want to try parking up here. The lift will get you from the main square in town all the way up to the Station. Be sure to dress warmly!",
                Price = 10,
                ImageUrl = "https://images2.imgbox.com/41/49/v1dI3OGz_o.png",
                IsActive = true
            },
            new Service
            {
                Id = 9,
                ServiceName = "'Are You The DJ?'",
                Description = "We know. You think you are the gift of song itself. Why not put your money where your mouth is? Let the whole town hear your...choices by selecting the music.",
                Price = 100,
                ImageUrl = "https://images2.imgbox.com/f0/ad/jZhvHsgk_o.png",
                IsActive = true
            },
            new Service
            {
                Id = 10,
                ServiceName = "Woodland Creature Package",
                Description = "Everyone thinks they are a Snow White. Now it can finally be true for you. Many tiny cuddles and helpful forest friends are waiting for you to add this package.",
                Price = 80,
                ImageUrl = "https://images2.imgbox.com/d6/e9/1AnPEjAB_o.png",
                IsActive = true
            },
            new Service
            {
                Id = 11,
                ServiceName = "Ent Walk",
                Description = "The trees are ancient, yet the Ents are older still. Take a walk with several of these arboreal protectors and see the world through a whole new lens.",
                Price = 50,
                ImageUrl = "https://images2.imgbox.com/27/87/FTqvH0Jh_o.png",
                IsActive = true
            },
            new Service
            {
                Id = 12,
                ServiceName = "Suddenly Spooky",
                Description = "You know when you think something is going to be really funny, but then it just creeps everyone out? Yeah...we got you. Your guests will be terrified. So will you, actually.",
                Price = 20,
                ImageUrl = "https://images2.imgbox.com/c6/dc/x24ENwDY_o.png",
                IsActive = true
            },
            new Service
            {
                Id = 13,
                ServiceName = "Fractal Tile",
                Description = "The tiles in this space can be made to display a mind-melting fractal of the person standing on them. Now just imagine you have 200 guests...yeah, we thought you would like that.",
                Price = 80,
                ImageUrl = "https://images2.imgbox.com/3d/4a/xpuGluG1_o.png",
                IsActive = true
            },
            new Service
            {
                Id = 14,
                ServiceName = "Goofy Golf",
                Description = "We weren't kidding when we said they built the Cathedral right on top the Goofy Golf. With access to the subterranean levels, your golf skills will be tested. You will be tested. ",
                Price = 200,
                ImageUrl = "https://images2.imgbox.com/25/3f/46BQBDgP_o.png",
                IsActive = true
            },
            new Service
            {
                Id = 15,
                ServiceName = "Haunting Vocals",
                Description = "The lilting voices of those gone before will be piped in to punctuate the ethereal nature of this space.",
                Price = 200,
                ImageUrl = "https://images2.imgbox.com/a4/79/KEI4lkbc_o.png",
                IsActive = true
            },
            new Service
            {
                Id = 16,
                ServiceName = "Non-Seance",
                Description = "When you want to have a party but don't want to risk bringing anything back from the other side. Madam Zostra will gladly hold back her services so that you might feel more comfortable in your mortal vessel.",
                Price = 500,
                ImageUrl = "https://images2.imgbox.com/01/f7/WYpnLtYu_o.png",
                IsActive = true
            },
            new Service
            {
                Id = 17,
                ServiceName = "Astral Travel",
                Description = "Madam Zostra is a skilled Translocator. She can have you zipped up to the Poconos all without leaving the warmth of her cottage.",
                Price = 600,
                ImageUrl = "https://images2.imgbox.com/fb/8b/DtGlv0kO_o.jpg",
                IsActive = true
            },
            new Service
            {
                Id = 18,
                ServiceName = "Item Identification",
                Description = "Found an object of dubious origin? Worried it might be cursed? This is like Antiques Roadshow but if that old spoon set made you end every sentence with a question.",
                Price = 200,
                ImageUrl = "https://images2.imgbox.com/4f/c8/XcTMx6tM_o.png",
                IsActive = true
            },
            new Service
            {
                Id = 19,
                ServiceName = "Earplugs",
                Description = "It is uhh, loud here. You will probably need these. Your guests will also be wanting these.",
                Price = 20,
                ImageUrl = "https://images2.imgbox.com/26/b4/wxtF3RRZ_o.png",
                IsActive = true
            },
            new Service
            {
                Id = 20,
                ServiceName = "Laser Lights",
                Description = "NO, these are not the same lasers they used to etch this space from the quarry. They have had fun colors added. You will probably not be in any danger.",
                Price = 300,
                ImageUrl = "https://images2.imgbox.com/21/f7/di3e3vqa_o.png",
                IsActive = true
            },
            new Service
            {
                Id = 21,
                ServiceName = "Comically Large Baloon Drop",
                Description = "What can we can? They're REALLY big balloons.",
                Price = 200,
                ImageUrl = "https://images2.imgbox.com/83/96/cSaL1GzD_o.png",
                IsActive = true
            }
        });
        modelBuilder.Entity<VenueService>().HasData(new VenueService[]
        {
            new VenueService
            {
                Id = 1,
                VenueId = 1,
                ServiceId = 1
            },
            new VenueService
            {
                Id = 2,
                VenueId = 1,
                ServiceId = 3
            },
            new VenueService
            {
                Id = 3,
                VenueId = 2,
                ServiceId = 1
            },
            new VenueService
            {
                Id = 4,
                VenueId = 3,
                ServiceId = 2
            },
            new VenueService
            {
                Id = 5,
                VenueId = 3,
                ServiceId = 4
            },
            new VenueService
            {
                Id = 6,
                VenueId = 4,
                ServiceId = 1
            },
            new VenueService
            {
                Id = 7,
                VenueId = 4,
                ServiceId = 3
            },
            new VenueService
            {
                Id = 8,
                VenueId = 5,
                ServiceId = 2
            },
            new VenueService
            {
                Id = 9,
                VenueId = 6,
                ServiceId = 2
            },
            new VenueService
            {
                Id = 10,
                VenueId = 6,
                ServiceId = 4
            },
            new VenueService
            {
                Id = 11,
                VenueId = 1,
                ServiceId = 5
            },
            new VenueService
            {
                Id = 12,
                VenueId = 1,
                ServiceId = 6
            },
            new VenueService
            {
                Id = 13,
                VenueId = 2,
                ServiceId = 7
            },
            new VenueService
            {
                Id = 14,
                VenueId = 2,
                ServiceId = 8
            },
            new VenueService
            {
                Id = 15,
                VenueId = 2,
                ServiceId = 9
            },
            new VenueService
            {
                Id = 16,
                VenueId = 3,
                ServiceId = 10
            },
            new VenueService
            {
                Id = 17,
                VenueId = 3,
                ServiceId = 11
            },
            new VenueService
            {
                Id = 18,
                VenueId = 3,
                ServiceId = 12
            },
            new VenueService
            {
                Id = 19,
                VenueId = 4,
                ServiceId = 13
            },
            new VenueService
            {
                Id = 20,
                VenueId = 4,
                ServiceId = 14
            },
            new VenueService
            {
                Id = 21,
                VenueId = 4,
                ServiceId = 15
            },
            new VenueService
            {
                Id = 22,
                VenueId = 5,
                ServiceId = 16
            },
            new VenueService
            {
                Id = 23,
                VenueId = 5,
                ServiceId = 17
            },
            new VenueService
            {
                Id = 24,
                VenueId = 5,
                ServiceId = 18
            },
            new VenueService
            {
                Id = 25,
                VenueId = 6,
                ServiceId = 19
            },
            new VenueService
            {
                Id = 26,
                VenueId = 6,
                ServiceId = 20
            },
            new VenueService
            {
                Id = 27,
                VenueId = 6,
                ServiceId = 21
            }
        });
            DateTime initialEventSubmitted = DateTime.SpecifyKind(DateTime.Parse("2024-01-12T11:00:00Z"), DateTimeKind.Utc);
            DateTime initialEventStart = DateTime.SpecifyKind(DateTime.Parse("2024-04-12T12:00:00Z"), DateTimeKind.Utc);


        modelBuilder.Entity<Event>().HasData(new Event[]
        {
            new Event
            {
                Id = 1,
                UserId = 2,
                VenueId = 5,
                EventName = "Darla Dinkles Bachelorette Party",
                ExpectedAttendees = 15,
                EventDescription = "Just some rowdy gals ready to get totally twisted.",
                IsPublic = true,
                SubmitedOn = initialEventSubmitted,
                Status = "Approved",
                EventStart = initialEventStart,
                Duration = 6
            }
        });

        modelBuilder.Entity<EventService>().HasData(new EventService[]
        {
            new EventService
            {
                Id = 1,
                EventId = 1,
                ServiceId = 2
            },
            new EventService
            {
                Id = 2,
                EventId = 1,
                ServiceId = 16
            }
        });
    }
}