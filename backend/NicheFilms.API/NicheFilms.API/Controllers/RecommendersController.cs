using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NicheFilms.API.Data;
using NicheFilms.API.Models;

namespace NicheFilms.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecommendersController : ControllerBase
    {
        private readonly NicheFilmsDbContext _context;

        public RecommendersController(NicheFilmsDbContext context)
        {
            _context = context;
        }

        // GET: api/recommenders/{userId}
        [HttpGet("{userId}")]
        public IActionResult GetUserRecommendations(int userId)
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