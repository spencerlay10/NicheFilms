using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NicheFilms.API.Data;
using NicheFilms.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Databases
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("IdentityConnection")));

builder.Services.AddDbContext<NicheFilmsDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("NicheFilmsDb")));

// Identity with minimal endpoints
builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

// Required to add the Email claim for user
builder.Services.Configure<IdentityOptions>(options =>
{
    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Email;
});

// Fix ClaimsPrincipal not populating email
builder.Services.AddScoped<IUserClaimsPrincipalFactory<IdentityUser>, CustomUserClaimsPrincipalFactory>();

// Cookie setup
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.Name = ".AspNetCore.Identity.Application";
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.LoginPath = "/login";
});

// CORS for React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")  // Allow only localhost:3000
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();  // Allow credentials like cookies or headers
    });
});

builder.Services.AddAuthorization();

var app = builder.Build();

// Swagger for development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// CORS handling (Ensure this is set before Routing)
app.UseCors("AllowFrontend");

app.UseHttpsRedirection();
app.UseRouting();
app.UseCookiePolicy();
app.UseAuthentication();
app.UseAuthorization();

// Endpoint routing
app.MapControllers();
app.MapIdentityApi<IdentityUser>();

// Logout endpoint
app.MapPost("/logout", async (HttpContext context, SignInManager<IdentityUser> signInManager) =>
{
    await signInManager.SignOutAsync();
    context.Response.Cookies.Delete(".AspNetCore.Identity.Application");
    return Results.Ok(new { message = "Logout successful" });
}).RequireAuthorization();

// /me route that returns gen_id
app.MapGet("/me", async (UserManager<IdentityUser> userManager, ClaimsPrincipal user, ApplicationDbContext db) =>
{
    var currentUser = await userManager.GetUserAsync(user);
    if (currentUser == null) return Results.Unauthorized();

    var genId = await db.Users
        .Where(u => u.Id == currentUser.Id)
        .Select(u => EF.Property<string>(u, "gen_id"))
        .FirstOrDefaultAsync();

    return Results.Ok(new { genId, email = currentUser.Email });
}).RequireAuthorization();

app.Run();

