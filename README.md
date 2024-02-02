# Rasket's Rime

The sleepy glowing beacon of Rasket's Rime lures travelers and transforms them into residents of the holler. Those residents in turn need a way to book their favorite local venues for all manner of events. Enter: Rasket's Rime - The easy way to submit event bookings (along with specialized services). Upon admin approval, an event will be displayed for the community to see and (if desired) attend!
## Why I Needed It

Rasket's Rime, as a concept, had been living rent-free in my brain for half a year. It started as a Canva project that I started as a way to wind down in the evenings. The thought of its warm window panes brought me a cozy kind of comfort after a rewarding day of programming. When the time came to choose a Server-Side Capstone project for my NSS Bootcamp, it felt only fitting that I finish it out with the town that I'd accidentally created while trying to rest my brain ridges. On top of that, I had some trepidation about working with Dates in C# and wanted to get in the mud, so to speak.
## User Features

- **Event Discovery**: View all approved events and detailed information about each.
- **Personal Event Management**: Submit, update, and cancel personal event submissions.
- **Venue and Service Exploration**: Access comprehensive lists of venues and services, including the ability to filter events by venue or service type.

## Administrator Features

- **Event Oversight**: Approve, reject, create, and edit events to curate the community calendar.
- **Venue & Service Control**: Add, update, disable, or delete venues and services, ensuring the platform remains accurate and up-to-date.
## Loom For To Watch

<div>
    <a href="[https://www.loom.com/share/9ef53d61a54d4d25a663f40909a9327f](https://www.loom.com/share/e88545bd0d314096b141ab4f79bd47f4?sid=8c258a13-1a1a-4099-b5d7-2b5c968447ce)">
      <p>Home Ono: A New App for Homeowners - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/9ef53d61a54d4d25a663f40909a9327f">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/9ef53d61a54d4d25a663f40909a9327f-1699894942035-with-play.gif">
    </a>
  </div>

## Screenshots



## Challenges Faced During Creation
This project went a lot smoother than my first one. The most notable snag was with the selection of dates and times. I wanted to make my life easier and use a library, however, the DateTimePickers available within my tech stack left me frustrated to say the least. Instead, I went with homebrew dropdowns. I don't love them, but they get the job done. Some other snags I hit and conquered like a champion:

<ul>
    <li>Making sure my Class models could work in harmony</li>
    <li>Starting the CSS on a project sometimes feels like dual-wielding katanas to slice a grape, only to cut your table in half. Then it works and I love it again.</li>
    <li>Wrapping my brain around the hierarchy of Authentication Classes (UserRoles, UserProfiles, etc.)</li>
    
  
</ul>

## Installation

To get started with Rasket's Rime:



### Prerequisites
Before diving into the setup process, ensure you have the following installed:
- [Node.js and npm](https://nodejs.org/en/download/)
- [.NET 6.0 SDK](https://dotnet.microsoft.com/download)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (or another database that Entity Framework Core supports, if applicable)

### Front-End Installation Steps
1. **Clone the Repository**
   Begin by cloning the repository to your local machine:
   ```bash
   git clone https://github.com/Foxglovery/RasketsRimeCapstone.git
   ```
2. **Navigate to the Client Directory**
   After cloning, move into the `client` directory where the React application is located:
   ```bash
   cd raskets-rime/client
   ```
3. **Install Dependencies**
   Inside the `client` directory, install the project's dependencies as defined in the `package.json` file:
   ```bash
   npm install
   ```
   This installs all necessary dependencies such as React, Bootstrap, React Router, and various testing libraries.
4. **Run Front-End In Development**
   In the 'client' directory, start the app
   ```bash
   npm start
   ```
### Back-End Installation Steps
1. ** Install Dependencies**
   In the root directory run :
   ```bash
   dotnet restore
   ```
2. **Create and Apply Migrations**
   Now create the initial migration
   ```bash
   dotnet ef migrations add InitialCreate
   ```
3. **Update Database**
   Now update the db
   ```bash
   dotnet ef database update
   ```
4. **Start Back-End Server**
   As of writing this, I am running the API using the VS Code debugger.
   Ensure you have the proper C# extension for working with C#.
   Run Debugger
