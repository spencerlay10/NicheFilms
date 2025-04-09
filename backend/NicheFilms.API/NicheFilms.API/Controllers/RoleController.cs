using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

namespace NicheFilms.API.Controllers;

[ApiController]
[Route("role")]
//[Authorize(Roles = "Administrator")]
[AllowAnonymous]
public class RoleController : ControllerBase
{
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly UserManager<IdentityUser> _userManager;

    public RoleController(RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager)
    {
        _roleManager = roleManager;
        _userManager = userManager;
    }

    // POST /role/add
    [HttpPost("add")]
    public async Task<IActionResult> AddRole([FromQuery] string roleName)
    {
        if (string.IsNullOrWhiteSpace(roleName))
            return BadRequest("Role name cannot be empty.");

        if (await _roleManager.RoleExistsAsync(roleName))
            return Conflict("Role already exists.");

        var result = await _roleManager.CreateAsync(new IdentityRole(roleName));
        return result.Succeeded
            ? Ok($"Role '{roleName}' created successfully.")
            : StatusCode(500, "An error occurred while creating the role.");
    }

    // POST /role/assign
    [HttpPost("assign")]
    public async Task<IActionResult> AssignRoleToUser(
        [FromQuery] string userEmail,
        [FromQuery] string roleName)
    {
        if (string.IsNullOrWhiteSpace(userEmail) || string.IsNullOrWhiteSpace(roleName))
            return BadRequest("User email and role name are required.");

        var user = await _userManager.FindByEmailAsync(userEmail);
        if (user == null)
            return NotFound("User not found.");

        if (!await _roleManager.RoleExistsAsync(roleName))
            return NotFound("Role does not exist.");

        var result = await _userManager.AddToRoleAsync(user, roleName);
        return result.Succeeded
            ? Ok($"Role '{roleName}' assigned to user '{userEmail}'.")
            : StatusCode(500, "An error occurred while assigning the role.");
    }
}
