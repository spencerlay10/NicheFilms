using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NicheFilms.API.Data;
using NicheFilms.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Databases
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("IdentityConnection")));

builder.Services.AddDbContext<NicheFilmsDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("NicheFilmsDb")));

// Identity setup with roles ✅
builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Authentication cookie scheme
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = IdentityConstants.ApplicationScheme;
    options.DefaultSignInScheme = IdentityConstants.ApplicationScheme;
    options.DefaultChallengeScheme = IdentityConstants.ApplicationScheme;
});

// Claims
builder.Services.Configure<IdentityOptions>(options =>
{
    // Claims setup (keep this!)
    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Email;

    // Password policy: only enforce length
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 12;
});

// Fix email not appearing in ClaimsPrincipal
builder.Services.AddScoped<IUserClaimsPrincipalFactory<IdentityUser>, CustomUserClaimsPrincipalFactory>();

// Cookie settings
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.Name = ".AspNetCore.Identity.Application";
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.LoginPath = "/login";
});

// CORS
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

// Auth
builder.Services.AddAuthorization();
builder.Services.AddSingleton<IEmailSender<IdentityUser>, NoOpEmailSender<IdentityUser>>();

var app = builder.Build();

// Optional: seed roles (Admin, Customer) on startup ✅
using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    string[] roles = new[] { "Admin", "Customer" };

    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new IdentityRole(role));
        }
    }
}

// Middleware
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.Use(async (context, next) =>
{
    context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Add("X-Frame-Options", "DENY");
    context.Response.Headers.Add("Referrer-Policy", "no-referrer");
    
    
    await next();
});
app.UseRouting();
app.UseCookiePolicy();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// 🔐 Login
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

// 🆕 Register (optionally add role)
app.MapPost("/register", async (
    UserManager<IdentityUser> userManager,
    RoleManager<IdentityRole> roleManager,
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

    // Optionally assign role after registration (default role)
    if (await roleManager.RoleExistsAsync("Customer"))
    {
        await userManager.AddToRoleAsync(user, "Customer");
    }

    return Results.Ok(new { message = "Registration successful" });
});

// 🚪 Logout
app.MapPost("/logout", async (HttpContext context, SignInManager<IdentityUser> signInManager) =>
{
    await signInManager.SignOutAsync();
    
    // Ensure cookies are deleted with correct settings
    context.Response.Cookies.Delete(".AspNetCore.Identity.Application", new CookieOptions
    {
        HttpOnly = true,
        Secure = true, // Ensure this matches your app's secure setting
        SameSite = SameSiteMode.None, // Ensure this matches the SameSite setting used during cookie creation
        Path = "/" // Ensure path matches the path the cookie was created with
    });
    
    return Results.Ok(new { message = "Logout successful" });
}).RequireAuthorization();


// 👤 Me
app.MapGet("/me", async (UserManager<IdentityUser> userManager, ClaimsPrincipal user) =>
{
    var currentUser = await userManager.GetUserAsync(user);
    if (currentUser == null) return Results.Unauthorized();

    var roles = await userManager.GetRolesAsync(currentUser);
    return Results.Ok(new { id = currentUser.Id, email = currentUser.Email, roles });
}).RequireAuthorization();

// 🛠️ Auth ping
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

// 🔐 Example of RBAC-protected route
app.MapGet("/admin-stuff", () => Results.Ok("You are an admin!"))
   .RequireAuthorization(new AuthorizeAttribute { Roles = "Admin" });
   

app.Run();

// DTOs
public record LoginRequest(string Email, string Password);
public record RegisterRequest(string Email, string Password);
