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

// Identity setup
builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Register default authentication scheme
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = IdentityConstants.ApplicationScheme;
    options.DefaultSignInScheme = IdentityConstants.ApplicationScheme;
    options.DefaultChallengeScheme = IdentityConstants.ApplicationScheme;
});

// Add email claim support
builder.Services.Configure<IdentityOptions>(options =>
{
    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Email;
});

// Custom claims principal factory
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
        policy.WithOrigins("http://localhost:3000", "https://gray-tree-00d24831e.6.azurestaticapps.net")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// Auth & Email
builder.Services.AddAuthorization();
builder.Services.AddSingleton<IEmailSender<IdentityUser>, NoOpEmailSender<IdentityUser>>();

var app = builder.Build();

// Swagger for development
app.UseSwagger();
app.UseSwaggerUI();

// Middleware pipeline
app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.UseRouting();
app.UseCookiePolicy();
app.UseAuthentication();
app.UseAuthorization();

// API endpoints
app.MapControllers();

// Login endpoint
app.MapPost("/login", async (
    SignInManager<IdentityUser> signInManager,
    UserManager<IdentityUser> userManager,
    HttpContext context,
    LoginRequest login
) =>
{
    var user = await userManager.FindByEmailAsync(login.Email);
    if (user == null)
        return Results.Json(new { message = "Invalid credentials." }, statusCode: 401);

    var result = await signInManager.PasswordSignInAsync(user.UserName!, login.Password, isPersistent: false, lockoutOnFailure: false);
    if (!result.Succeeded)
        return Results.Json(new { message = "Invalid credentials." }, statusCode: 401);

    return Results.Ok(new { message = "Login successful." });
});

// Register endpoint
app.MapPost("/register", async (
    UserManager<IdentityUser> userManager,
    HttpContext context,
    RegisterRequest register
) =>
{
    var user = new IdentityUser
    {
        UserName = register.Email,
        Email = register.Email
    };

    var result = await userManager.CreateAsync(user, register.Password);
    if (!result.Succeeded)
    {
        var errors = result.Errors.Select(e => e.Description);
        return Results.Json(new { message = "Registration failed", errors }, statusCode: 400);
    }

    return Results.Ok(new { message = "Registration successful" });
});

// Logout endpoint
app.MapPost("/logout", async (HttpContext context, SignInManager<IdentityUser> signInManager) =>
{
    await signInManager.SignOutAsync();
    context.Response.Cookies.Delete(".AspNetCore.Identity.Application");
    return Results.Ok(new { message = "Logout successful" });
}).RequireAuthorization();

// /me route to return logged-in user info
app.MapGet("/me", async (UserManager<IdentityUser> userManager, ClaimsPrincipal user) =>
{
    var currentUser = await userManager.GetUserAsync(user);
    if (currentUser == null) return Results.Unauthorized();

    return Results.Ok(new { id = currentUser.Id, email = currentUser.Email });
}).RequireAuthorization();

// Pingauth route
app.MapGet("/pingauth", (HttpContext context, ClaimsPrincipal user) =>
{
    Console.WriteLine($"User authenticated? {user.Identity?.IsAuthenticated}");

    if (!user.Identity?.IsAuthenticated ?? false)
    {
        Console.WriteLine("Unauthorized request to /pingauth");
        return Results.Unauthorized();
    }

    var email = user.FindFirstValue(ClaimTypes.Email) ?? "unknown@example.com";
    Console.WriteLine($"Authenticated User Email: {email}");

    return Results.Json(new { email });
}).RequireAuthorization();

app.Run();

// DTOs
public record LoginRequest(string Email, string Password);
public record RegisterRequest(string Email, string Password);
