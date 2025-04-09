using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NicheFilms.API.Data;
using NicheFilms.API.Services; // 👈 Make sure your CustomUserClaimsPrincipalFactory lives here

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
builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();



// Required to add the Email claim for user
builder.Services.Configure<IdentityOptions>(options =>
{
    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Email;
});

// ✅ CRUCIAL: This fixes ClaimsPrincipal not populating email
builder.Services.AddScoped<IUserClaimsPrincipalFactory<IdentityUser>, CustomUserClaimsPrincipalFactory>();

// Cookie setup — not strictly required for AddIdentityApiEndpoints but doesn't hurt
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
        policy.WithOrigins("http://localhost:3000", "https://localhost:5000", "https://localhost:5001")
            .AllowCredentials()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

builder.Services.AddAuthorization();

builder.Services.AddSingleton<IEmailSender<IdentityUser>, NoOpEmailSender<IdentityUser>>();


var app = builder.Build();

// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseCookiePolicy();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapIdentityApi<IdentityUser>(); // Map default Identity API endpoints

// Logout endpoint
app.MapPost("/logout", async (HttpContext context, SignInManager<IdentityUser> signInManager) =>
{
    await signInManager.SignOutAsync();
    context.Response.Cookies.Delete(".AspNetCore.Identity.Application");
    return Results.Ok(new { message = "Logout successful" });
}).RequireAuthorization();

// Auth check endpoint for frontend
app.MapGet("/pingauth", async (ClaimsPrincipal user, UserManager<IdentityUser> userManager) =>
{
    if (!user.Identity?.IsAuthenticated ?? false)
    {
        return Results.Unauthorized();
    }

    var email = user.FindFirstValue(ClaimTypes.Email) ?? "unknown@example.com";
    var userObj = await userManager.GetUserAsync(user);
    var roles = await userManager.GetRolesAsync(userObj);

    return Results.Json(new { email, roles });
}).RequireAuthorization();


app.Run();
