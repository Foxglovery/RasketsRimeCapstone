using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace RasketsRimeCapstone.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ServiceName = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Venues",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    VenueName = table.Column<string>(type: "text", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    ContactInfo = table.Column<string>(type: "text", nullable: false),
                    MaxOccupancy = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Venues", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    ProviderKey = table.Column<string>(type: "text", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    RoleId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserProfiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: false),
                    IsAdmin = table.Column<bool>(type: "boolean", nullable: false),
                    Roles = table.Column<List<string>>(type: "text[]", nullable: true),
                    ProfileImage = table.Column<string>(type: "text", nullable: false),
                    IdentityUserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserProfiles_AspNetUsers_IdentityUserId",
                        column: x => x.IdentityUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VenueServices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    VenueId = table.Column<int>(type: "integer", nullable: false),
                    ServiceId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VenueServices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VenueServices_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VenueServices_Venues_VenueId",
                        column: x => x.VenueId,
                        principalTable: "Venues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    VenueId = table.Column<int>(type: "integer", nullable: false),
                    EventName = table.Column<string>(type: "text", nullable: false),
                    ExpectedAttendees = table.Column<int>(type: "integer", nullable: false),
                    EventDescription = table.Column<string>(type: "text", nullable: false),
                    IsPublic = table.Column<bool>(type: "boolean", nullable: false),
                    SubmitedOn = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Status = table.Column<string>(type: "text", nullable: false),
                    EventStart = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Duration = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Events_UserProfiles_UserId",
                        column: x => x.UserId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Events_Venues_VenueId",
                        column: x => x.VenueId,
                        principalTable: "Venues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EventServices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EventId = table.Column<int>(type: "integer", nullable: false),
                    ServiceId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventServices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EventServices_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EventServices_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a601c402-545f-4ba8-869d-6f0968774d58", null, "User", "user" },
                    { "c3aaeb97-d2ba-4a53-a521-4eea61e59b35", null, "Admin", "admin" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f", 0, "b8b62a5e-7bdd-482e-b875-1e9170683265", "admin@neopets.com", false, false, null, null, null, "AQAAAAIAAYagAAAAEDbqUktx3h1ro89CkVVbZn6MtEOFfA2BTEc+PUrP8ELbbAIaCNoP6r61TikfoF+O5g==", null, false, "d200ccdf-4bba-460b-9bd5-13d56528462f", false, "Administrator" },
                    { "e2731372-eb45-4cc5-9a34-d9711f3642b2", 0, "5eda098b-ad6f-45cc-aca7-7f0dea45eaa0", "Schlebethany@neopets.com", false, false, null, null, null, "AQAAAAIAAYagAAAAEHSwkvd+KBNi3fb4DMeZU0IlOfi8QANxy/Mc1u+HWQ64mquXqFKCWE732cpmYL0Xlg==", null, false, "ed6c3d88-878b-47ab-86c4-786b77c2e374", false, "Schlebethany" }
                });

            migrationBuilder.InsertData(
                table: "Services",
                columns: new[] { "Id", "Description", "IsActive", "Price", "ServiceName" },
                values: new object[,]
                {
                    { 1, "We will pick up your trash, but we won't be happy about it.", true, 60m, "Trash-Pickup" },
                    { 2, "Pitaya, Pineapple, Mango...You name it, we will throw it in a bucket and blend it till its oh-so smooth.", true, 100m, "Smoothie-Bar" },
                    { 3, "If your wondering who will be providing security, chances are you've already met them and they were likely not impressed. Ever watchful, they do not rest.", true, 100m, "Security (By The Arbiter's Secret Militia)" },
                    { 4, "Just because a shadowy organization strong-armed our town into a monopoly on security services does NOT mean they don't make excellent caregivers. Our operatives are standing by to assess and neutralize any bad behavior.", true, 200m, "Child-Care (Also By The Arbiter's Secret Militia)" },
                    { 5, "Look, the University is under the lake. You want to try your hand at getting your car out yourself? Go ahead.", true, 50m, "Valet-Lake Parking" },
                    { 6, "We will let you shove as many books as you can fit in a burlap sac from the 'donated' stacks. We are not responsible for what these books may or may not do upon reading. ", true, 800m, "Library 'Supermarket Sweep'" },
                    { 7, "It gets cold here. These floating bowls of heat will warm your guests. Be sure you do not put ANYTHING in the censor. Again we cannot stress that enough.", true, 20m, "Mobile Heat Censors" },
                    { 8, "You really do not want to try parking up here. The lift will get you from the main square in town all the way up to the Station. Be sure to dress warmly!", true, 10m, "Mountain-Top Ski Lift" },
                    { 9, "We know. You think you are the gift of song itself. Why not put your money where your mouth is? Let the whole town hear your...choices by selecting the music.", true, 100m, "'Are You The DJ?'" },
                    { 10, "Everyone thinks they are a Snow White. Now it can finally be true for you. Many tiny cuddles and helpful forest friends are waiting for you to add this package.", true, 80m, "Woodland Creature Package" },
                    { 11, "The trees are ancient, yet the Ents are older still. Take a walk with several of these arboreal protectors and see the world through a whole new lens.", true, 50m, "Ent Walk" },
                    { 12, "You know when you think something is going to be really funny, but then it just creeps everyone out? Yeah...we got you. Your guests will be terrified. So will you, actually.", true, 20m, "Suddenly Spooky" },
                    { 13, "The tiles in this space can be made to display a mind-melting fractal of the person standing on them. Now just imagine you have 200 guests...yeah, we thought you would like that.", true, 80m, "Fractal Tile" },
                    { 14, "We weren't kidding when we said they built the Cathedral right on top the Goofy Golf. With access to the subterranean levels, your golf skills will be tested. You will be tested. ", true, 200m, "Goofy Golf" },
                    { 15, "The lilting voices of those gone before will be piped in to punctuate the ethereal nature of this space.", true, 200m, "Haunting Vocals" },
                    { 16, "When you want to have a party but don't want to risk bringing anything back from the other side. Madam Zostra will gladly hold back her services so that you might feel more comfortable in your mortal vessel.", true, 500m, "Non-Seance" },
                    { 17, "Madam Zostra is a skilled Translocator. She can have you zipped up to the Poconos all without leaving the warmth of her cottage.", true, 600m, "Astral Travel" },
                    { 18, "Found an object of dubious origin? Worried it might be cursed? This is like Antiques Roadshow but if that old spoon set made you end every sentence with a question.", true, 200m, "Item Identification" },
                    { 19, "It is uhh, loud here. You will probably need these. Your guests will also be wanting these.", true, 20m, "Earplugs" },
                    { 20, "NO, these are not the same lasers they used to etch this space from the quarry. They have had fun colors added. You will probably not be in any danger.", true, 300m, "Laser Lights" },
                    { 21, "What can we can? They're REALLY big balloons.", true, 200m, "Comically Large Baloon Drop" }
                });

            migrationBuilder.InsertData(
                table: "Venues",
                columns: new[] { "Id", "Address", "ContactInfo", "Description", "IsActive", "MaxOccupancy", "VenueName" },
                values: new object[,]
                {
                    { 1, "19 Under Lake Blvd", "Arbiter Darling : 850-474-5555", "A prestigious arcane academy lovingly nestled beneath the central lake of the town. Its atrium is more than accommodating for crowds large and small.", true, 300, "The Unmoored University" },
                    { 2, "327 Rumbler Route Way", "Foxglove Mackenzie -- 850-985-2934", "From atop the mountains, the radio station glows eternal. Deceptively large, its unassuming facade belies the many cozy suites nestled within its walls.", true, 85, "Mountain-Top Radio Station" },
                    { 3, "667 W Rambling Road", "Thorely Goodparty", "The warmth and glow of the Cedrine trees provides a lovely backdrop for any event. Weather can be controlled from inside. Many a night has been spent taking in the thrum of the woods under a revelry-drunk moon.", true, 50, "Cedrine Forest Adirondack" },
                    { 4, "3762 Gnomiad Fork", "Parker Billian -- 850-987-2926", "Believe it or not, this was never a cathedral. The creator instead saw fit to erect this behemoth of architectural ego on top of the abandoned Goofy Golf complex. Vestigial dinosaurs and aliens still linger where you would least expect them.", true, 200, "Glinterland Cathedral Hall" },
                    { 5, "3 Nestledown Thicket", "Madame Zostra -- 850-222-1053", "Ambience and incense will greet you as you settle in. On display are the relics and spoils of war won by Madame Zostra in her pursuit of the Thaumaturgical Arts", true, 20, "Madame Zostra's Family Fun Time Seance Parlor" },
                    { 6, "5590 Fingerpail Row", "Maisel Darby --850-334-9010", "Much like its namesake, this amphitheatre is beloved and commands your attention. Excellent acoustics make for a wonderful way to talk/sing at your audience.  ", true, 500, "The Patty Lupone Groupon Coupon Main Stage" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[,]
                {
                    { "c3aaeb97-d2ba-4a53-a521-4eea61e59b35", "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f" },
                    { "a601c402-545f-4ba8-869d-6f0968774d58", "e2731372-eb45-4cc5-9a34-d9711f3642b2" }
                });

            migrationBuilder.InsertData(
                table: "UserProfiles",
                columns: new[] { "Id", "Address", "FirstName", "IdentityUserId", "IsAdmin", "LastName", "ProfileImage", "Roles" },
                values: new object[,]
                {
                    { 1, "101 Main Street", "Admina", "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f", true, "Strator", "https://i.pinimg.com/564x/c0/fd/d7/c0fdd735d4db94c60866e43e44ae98cf.jpg", null },
                    { 2, "222 N Sidereal Way", "Schlebethany", "e2731372-eb45-4cc5-9a34-d9711f3642b2", false, "Pleasance", "https://beta.creativecirclecdn.com/timberjay/original/20210127-160305-1.29%20weasel%20looks.tif.jpg", null }
                });

            migrationBuilder.InsertData(
                table: "VenueServices",
                columns: new[] { "Id", "ServiceId", "VenueId" },
                values: new object[,]
                {
                    { 1, 1, 1 },
                    { 2, 2, 1 },
                    { 3, 3, 1 },
                    { 4, 4, 1 },
                    { 5, 1, 2 },
                    { 6, 2, 2 },
                    { 7, 3, 2 },
                    { 8, 4, 2 },
                    { 9, 1, 3 },
                    { 10, 2, 3 },
                    { 11, 3, 3 },
                    { 12, 4, 3 },
                    { 13, 1, 4 },
                    { 14, 2, 4 },
                    { 15, 3, 4 },
                    { 16, 4, 4 },
                    { 17, 1, 5 },
                    { 18, 2, 5 },
                    { 19, 3, 5 },
                    { 20, 4, 5 },
                    { 21, 1, 6 },
                    { 22, 2, 6 },
                    { 23, 3, 6 },
                    { 24, 4, 6 },
                    { 25, 5, 1 },
                    { 26, 6, 1 },
                    { 27, 7, 2 },
                    { 28, 8, 2 },
                    { 29, 9, 2 },
                    { 30, 10, 3 },
                    { 31, 11, 3 },
                    { 32, 12, 3 },
                    { 33, 13, 4 },
                    { 34, 14, 4 },
                    { 35, 15, 4 },
                    { 36, 16, 5 },
                    { 37, 17, 5 },
                    { 38, 18, 5 },
                    { 39, 19, 6 },
                    { 40, 20, 6 },
                    { 41, 21, 6 }
                });

            migrationBuilder.InsertData(
                table: "Events",
                columns: new[] { "Id", "Duration", "EventDescription", "EventName", "EventStart", "ExpectedAttendees", "IsPublic", "Status", "SubmitedOn", "UserId", "VenueId" },
                values: new object[] { 1, 6, "Just some rowdy gals ready to get totally twisted.", "Darla Dinkles Bachelorette Party", new DateTime(2024, 4, 12, 7, 0, 0, 0, DateTimeKind.Utc), 15, true, "Accepted", new DateTime(2024, 1, 12, 5, 0, 0, 0, DateTimeKind.Utc), 2, 5 });

            migrationBuilder.InsertData(
                table: "EventServices",
                columns: new[] { "Id", "EventId", "ServiceId" },
                values: new object[,]
                {
                    { 1, 1, 2 },
                    { 2, 1, 16 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EventServices_EventId",
                table: "EventServices",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_EventServices_ServiceId",
                table: "EventServices",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_UserId",
                table: "Events",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_VenueId",
                table: "Events",
                column: "VenueId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProfiles_IdentityUserId",
                table: "UserProfiles",
                column: "IdentityUserId");

            migrationBuilder.CreateIndex(
                name: "IX_VenueServices_ServiceId",
                table: "VenueServices",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_VenueServices_VenueId",
                table: "VenueServices",
                column: "VenueId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "EventServices");

            migrationBuilder.DropTable(
                name: "VenueServices");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "Services");

            migrationBuilder.DropTable(
                name: "UserProfiles");

            migrationBuilder.DropTable(
                name: "Venues");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
