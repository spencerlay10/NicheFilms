using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NicheFilms.API.Data;
using NicheFilms.API.Models;

namespace NicheFilms.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecommendersController : ControllerBase
    {
        private readonly NicheFilmsDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public RecommendersController(NicheFilmsDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // ✅ SECURE VERSION: GET /api/recommenders (no userId in route)
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetUserRecommendations()
        {
            var userIdStr = _userManager.GetUserId(User);

            if (!int.TryParse(userIdStr, out var userId))
            {
                return Unauthorized("Could not resolve user ID from session.");
            }

            var row = await _context.UserRecommendations
                                    .FirstOrDefaultAsync(r => r.UserId == userId);

            if (row == null)
            {
                return NotFound("Recommendations not found for this user.");
            }

            return Ok(row);
        }

        // ❗ Optional: Keep the old one for testing or remove it
        [HttpGet("{userId}")]
        public IActionResult GetUserRecommendationsById(int userId)
        {
            var row = _context.UserRecommendations.FirstOrDefault(r => r.UserId == userId);

            if (row == null)
            {
                return NotFound("Recommendations not found for this user.");
            }

            return Ok(row);
        }
    }
}
